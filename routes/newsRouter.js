const express = require('express');
const router = express.Router();
const pool = require('../db'); // Postgres bazasiga ulanish
const verifyToken = require('../middleware/auth');

// Yeni veri ekleme (Create)
router.post('/new',verifyToken, async (req, res) => {
    try {
      const { category_id, title,  telegram, facebook, okrug } = req.body;
  
      const query = `
        INSERT INTO new (category_id, title,  telegram, facebook, okrug)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
  
      const values = [category_id, title,  telegram, facebook, okrug];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error creating new data:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Tüm verileri getirme (Read)
  router.get('/new', async (req, res) => {
    try {
      const query = 'SELECT * FROM new;';
      const result = await pool.query(query);
      const query1 = 'SELECT * FROM new_action;';
      const result1 = await pool.query(query1);

for (let  i = 0;  i < result.rows.length;  i++) {
  result.rows[i].image=''
  result.rows[i].actions=[]
for (let j = 0; j < result1.rows.length; j++) {
if(result.rows[i].id===result1.rows[j].news_id){
  result.rows[i].image=result1.rows[j].image
  result.rows[i].actions.push(result1.rows[j])
}
}  
}




      res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Veriyi güncelleme (Update)
  router.put('/new/:id',verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { category_id, title, look, telegram, facebook, okrug } = req.body;
  
      const query = `
        UPDATE new
        SET category_id = $1, title = $2, look = $3, telegram = $4, facebook = $5, okrug = $6, time_update = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *;
      `;
  
      const values = [category_id, title, look, telegram, facebook, okrug, id];
  
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Veriyi silme (Delete)
  router.delete('/new/:id',verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
  
      const query = 'DELETE FROM new WHERE id = $1;';
      const values = [id];
  
      await pool.query(query, values);
      res.json({ message: 'Data deleted' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: error.message });
    }
  });
  




module.exports = router;