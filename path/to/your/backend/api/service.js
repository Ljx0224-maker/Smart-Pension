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

// Edit product API
router.post('/editProduct', async (req, res) => {
  try {
    const { serviceType, oldCategory, category, status, lastUpdatedBy } = req.body;
    const connection = await pool.getConnection();

    // SQL statement to update product information
    const sql = `
      UPDATE your_table_name
      SET category = ?, status = ?, lastUpdatedBy = ?
      WHERE serviceType = ? AND category = ?
    `;
    const [result] = await connection.execute(sql, [
      category,
      status,
      lastUpdatedBy,
      serviceType,
      oldCategory,
    ]);

    connection.release();

    if (result.affectedRows > 0) {
      res.json({ code: 200, message: 'Edit successful' });
    } else {
      res.json({ code: 500, message: 'Edit failed' });
    }
  } catch (error) {
    console.error('Error editing product:', error);
    res.json({ code: 500, message: 'An error occurred while editing the product' });
  }
});

module.exports = router;
