const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish
const { upload_file, delete_file, put_file } = require('../middleware/file_upload');


router.post('/new_action', async (req, res) => {
    try {
      const { desc,news_id } = req.body;
  var image=upload_file(req)
      const query = `
        INSERT INTO new_action (image,"desc",news_id)
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
      const { desc ,news_id } = req.body;
  
      const query = `
        UPDATE new_action
        SET image = $1, "desc" = $2,news_id=$3 time_update = CURRENT_TIMESTAMP
        WHERE id = $4
        RETURNING *;
      `;
      var image_file= await pool.query('SELECT * FROM new_action WHERE id = $1;',[id])
     var image=put_file(image_file.rows[0].image,req)
      const values = [image, desc ,news_id, id];
  
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
      var delete_image= await pool.query('SELECT * FROM new_action WHERE id = $1;',[id])
      delete_file(delete_image.rows[0].image)
     var a=await pool.query(query, values);
     console.log(a);
      res.json({ message: 'New action deleted' });
    } catch (error) {
      console.error('Error deleting new action:', error);
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;