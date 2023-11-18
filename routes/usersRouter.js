const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish

// Kullanıcı ekleme (Create)
router.post('/users', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const query = `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
      `;
      const values = [username, password];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Tüm kullanıcıları getirme (Read)
  router.get('/users', async (req, res) => {
    try {
      const query = 'SELECT * FROM users;';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Kullanıcıyı güncelleme (Update)
  router.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password } = req.body;
  
      const query = `
        UPDATE users
        SET username = $1, password = $2, time_update = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
      `;
  
      const values = [username, password, id];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Kullanıcıyı silme (Delete)
  router.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const query = 'DELETE FROM users WHERE id = $1;';
      const values = [id];
  
      await pool.query(query, values);
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  });
  




module.exports = router;