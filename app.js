const express = require('express')

const mongooseDb = require('mongoose')

const morgan = require('morgan')

const bodyParser = require('body-parser')

const Router = require('./user/routes')
const Admin = require('./admin/adminRoues')


const app = express()
// here we connect to our database management , i use mongoDB compass
mongooseDb.set('strictQuery','false')
mongooseDb.connect("mongodb://localhost:27017/NodeTask"
)
app.use(morgan('combined'))

// body-parser allows us to get our input from the client side
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// CORS , here i set up some code wgich allows me to connect with my front end PORT or POSTMAN API
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE")
        return res.status(200).json({})
    }
    next()
})

app.use(Router)
app.use(Admin)


module.exports = app