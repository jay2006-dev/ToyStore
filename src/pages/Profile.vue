<template>
  <div>
    <h1>User Profile</h1>
    <div class="profile-details">
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Email:</strong></p>
      <p><strong>Member Since:</strong> January 2023</p>
      <div class="profile-actions">
        <button class="edit-profile-btn">Edit Profile</button>
        <button class="change-password-btn">Change Password</button>
      </div>
    </div>
    <div class="order-history">
      <h2>Order History</h2>
      <p>No orders placed yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
}
</script>
