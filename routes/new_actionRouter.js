const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish


router.post('/new_action', async (req, res) => {
    try {
      const { image, desc,news_id } = req.body;
  
      const query = `
        INSERT INTO new_action (image,desc,news_id)
        VALUES ($1, $2,$3)
        RETURNING *;
      `;
  
      const values = [image, desc,news_id];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating new action:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all new actions
  router.get('/new_action', async (req, res) => {
    try {
      const query = 'SELECT * FROM new_action;';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error getting new actions:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a new action
  router.put('/new_action/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { image, desc,news_id } = req.body;
  
      const query = `
        UPDATE new_action
        SET image = $1, "desc" = $2,news_id=$3 time_update = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *;
      `;
  
      const values = [image, desc,news_id, id];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating new action:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a new action
  router.delete('/new_action/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const query = 'DELETE FROM new_action WHERE id = $1;';
      const values = [id];
  
      await pool.query(query, values);
      res.json({ message: 'New action deleted' });
    } catch (error) {
      console.error('Error deleting new action:', error);
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;