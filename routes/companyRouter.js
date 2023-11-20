const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish
const { put_file, upload_file, delete_file } = require('../middleware/file_upload');
const verifyToken = require('../middleware/auth');

router.post('/company',verifyToken, async (req, res) => {
    try {
      const {
        phone1,
        phone2,
        instagram,
        facebook,
        telegram,
        youtobe,
        appStore,
        playMarket,
        twitter,
        ok,
        email,
      } = req.body;
      var image=upload_file(req)
      const query = `
        INSERT INTO company (
          image,
          phone1,
          phone2,
          instagram,
          facebook,
          telegram,
          youtobe,
          app_store,
          play_market,
          twitter,
          ok,
          email
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
      `;
  
      const values = [
        image,
        phone1,
        phone2,
        instagram,
        facebook,
        telegram,
        youtobe,
        appStore,
        playMarket,
        twitter,
        ok,
        email,
      ];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all companies
  router.get('/company', async (req, res) => {
    try {
      const query = 'SELECT * FROM company;';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error getting companies:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a company
  router.put('/company/:id',verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const {
        phone1,
        phone2,
        instagram,
        facebook,
        telegram,
        youtobe,
        appStore,
        playMarket,
        twitter,
        ok,
        email,
      } = req.body;
      var image_file= await pool.query('SELECT * FROM new_action WHERE id = $1;',[id])
      var image=put_file(image_file.rows[0].image,req)
      const query = `
        UPDATE company
        SET
          image = $1,
          phone1 = $2,
          phone2 = $3,
          instagram = $4,
          facebook = $5,
          telegram = $6,
          youtobe = $7,
          app_store = $8,
          play_market = $9,
          twitter = $10,
          ok = $11,
          email = $12,
          time_update = CURRENT_TIMESTAMP
        WHERE id = $13
        RETURNING *;
      `;
  
      const values = [
        image,
        phone1,
        phone2,
        instagram,
        facebook,
        telegram,
        youtobe,
        appStore,
        playMarket,
        twitter,
        ok,
        email,
        id,
      ];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating company:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a company
  router.delete('/company/:id',verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      var delete_image= await pool.query('SELECT * FROM new_action WHERE id = $1;',[id])
      delete_file(delete_image.rows[0].image)
      const query = 'DELETE FROM company WHERE id = $1;';
      const values = [id];
  
      await pool.query(query, values);
      res.json({ message: 'Company deleted' });
    } catch (error) {
      console.error('Error deleting company:', error);
      res.status(500).json({ error: error.message });
    }
  });
  




module.exports = router;