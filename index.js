const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const bodyParser = require('body-parser');

const users=require("./routes/usersRouter")
const company=require('./routes/companyRouter')
const category=require('./routes/categoryRouter')
const news=require('./routes/newsRouter')
const news_action=require('./routes/new_actionRouter');
const createUser = require("./middleware/user_create");


app.use(fileUpload())
app.use(cors())
app.use(express.static('./media'))
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    createUser()
    res.send({message:"welcome to our api"})
})
app.use('/api/v1/',users)
app.use('/api/v1/',category)
app.use('/api/v1/',company)
app.use('/api/v1/',news)
app.use('/api/v1/',news_action)


app.listen(5000, () => {
    console.log("Localhost is Running");
})

