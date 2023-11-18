require("dotenv").config()
const { Pool } =require('pg')
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})
// const pool = new Client({
//     user: "abbasuz1_abbas",
//     host: "containers-us-west-94.railway.app",
//     database: "abbasuz1_test",
//     password: ")!jsaee{^2j(",
//     port: 6061
// })
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
        console.log(err);
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool