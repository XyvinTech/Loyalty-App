const express = require('express')
const app = new express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const PORT = process.env.PORT || 3005
const routes = require('./routes/route')
const path = require('path')



require('./db') //DB connection
app.use(cors('*'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:true}))

app.use('/upload', express.static(path.join(__dirname, 'uploads')))
console.log( path.join(__dirname, 'uploads'))


app.use('/',routes)

app.listen(PORT,()=>{
    console.log('Server is running at '+ PORT);
})