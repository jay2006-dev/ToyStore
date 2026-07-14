import express from 'express'
import Razorpay from 'razorpay'
import cors from 'cors'
import crypto from 'crypto'
import dotenv from 'dotenv'

// Load environment variables from backend/.env
dotenv.config()

const app = express()

// ===== SECURITY: Restrict CORS to only the frontend origin =====
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json())

// ===== SECURITY: Firebase Token Verification Middleware =====
// Verifies the Firebase ID token by calling Google's public tokeninfo endpoint.
// No firebase-admin SDK needed — lightweight and works without a service account.
async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' })
  }

  const idToken = authHeader.split('Bearer ')[1]

  try {
    // Verify the token using Google's public token verification endpoint
    const response = await fetch(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${process.env.FIREBASE_API_KEY || ''}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      }
    )

    const data = await response.json()

    if (data.error || !data.users || data.users.length === 0) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Attach verified user info to request
    req.user = {
      uid: data.users[0].localId,
      email: data.users[0].email,
      displayName: data.users[0].displayName || null,
    }

    next()
  } catch (err) {
    console.error('Token verification error:', err.message)
    return res.status(401).json({ error: 'Token verification failed' })
  }
}

// ===== Razorpay setup using environment variables =====
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  console.warn('⚠️  Razorpay keys not found in .env — payment routes will fail')
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
})

// ===== PROTECTED: Create order route =====
// Now requires a valid Firebase auth token
app.post('/api/create-order', verifyFirebaseToken, async (req, res) => {
  try {
    const { cartItems } = req.body

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty cart items' })
    }

    // Validate and calculate total securely on the server
    let totalAmount = 0
    for (const item of cartItems) {
      const price = Number(item.price)
      const qty = Number(item.quantity !== undefined ? item.quantity : (item.qty !== undefined ? item.qty : 0))

      if (isNaN(price) || isNaN(qty) || price <= 0 || qty <= 0) {
        return res.status(400).json({ error: `Invalid item: ${JSON.stringify(item)}` })
      }

      totalAmount += price * qty
    }

    if (totalAmount <= 0) {
      return res.status(400).json({ error: 'Cart total must be greater than 0' })
    }

    const options = {
      amount: Math.round(totalAmount * 100), // ₹ → paise
      currency: 'INR',
      receipt: `receipt_${req.user.uid}_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)
    console.log(`✅ Order created for user ${req.user.uid}:`, order.id)
    res.json(order)
  } catch (err) {
    console.error('❌ Error creating order:', err)
    res.status(500).json({ error: 'Error creating order' })
  }
})

// ===== PROTECTED: Verify payment route =====
app.post('/api/verify-payment', verifyFirebaseToken, (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Missing payment details' })
  }

  try {
    // Use the secret from env variable directly, not from the Razorpay instance
    const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`)
    const generatedSignature = hmac.digest('hex')

    if (generatedSignature === razorpay_signature) {
      console.log(`✅ Payment verified for user ${req.user.uid}: ${razorpay_payment_id}`)
      return res.json({ success: true })
    } else {
      console.warn(`⚠️ Signature mismatch for user ${req.user.uid}`)
      return res.status(400).json({ success: false, error: 'Signature mismatch' })
    }
  } catch (err) {
    console.error('❌ Error verifying payment:', err)
    res.status(500).json({ success: false, error: 'Verification failed' })
  }
})

// ===== Health check (public) =====
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`))
