require('dotenv').config()
const db = require('../db');

async function createUser() {
  try {
    const password=process.env.password;
    const username =process.env.username;
    const query2 = 'SELECT * FROM users;';
    const result2 = await db.query(query2);
    if(result2.rows.length===0){
    const query = 'INSERT INTO users (password, username) VALUES ($1, $2) RETURNING *;';
    const values = [password, username];
     const result = await db.query(query, values);
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

module.exports=createUser