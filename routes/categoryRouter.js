const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish


router.post('/category', async (req, res) => {
    try {
      const { title } = req.body;
  
      const query = `
        INSERT INTO category (title)
        VALUES ($1)
        RETURNING *;
      `;
  
      const values = [title];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error:error.message });
    }
  });
  
  // Get all categories
  router.get('/category', async (req, res) => {
    try {
      const query = 'SELECT * FROM category;';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error getting categories:', error);
      res.status(500).json({ error:error.message });
    }
  });
  
  // Update a category
  router.put('/category/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
  
      const query = `
        UPDATE category
        SET title = $1, time_update = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
      `;
  
      const values = [title, id];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error:error.message });
    }
  });
  
  // Delete a category
  router.delete('/category/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const query = 'DELETE FROM category WHERE id = $1;';
      const values = [id];
  
      await pool.query(query, values);
      res.json({ message: 'Category deleted' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error:error.message });
    }
  });



module.exports = router;