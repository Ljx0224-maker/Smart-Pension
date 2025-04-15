const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Create a database connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

// Password reset API
router.post('/updatePassword', async (req, res) => {
  try {
    const { staffId, oldPassword, newPassword } = req.body;

    // First, verify the old password
    const [rows] = await pool.execute('SELECT password FROM users WHERE staffId = ?', [staffId]);
    if (rows.length === 0 || rows[0].password !== oldPassword) {
      return res.status(400).json({ message: 'Old password is incorrect or user ID does not exist' });
    }

    // Update the password
    await pool.execute('UPDATE users SET password = ? WHERE staffId = ?', [newPassword, staffId]);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'An error occurred while updating the password' });
  }
});

module.exports = router;
