const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');

const users=require("./routes/usersRouter")




app.use(fileUpload())
app.use(cors())
app.use(express.static('./media'))
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send({message:"welcome to our api"})
})
app.use('/api/v1/',users)

app.listen(5000, () => {
    console.log("Localhost is Running");
})

