const express = require('express')
const app = new express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const PORT = process.env.PORT || 3005
const routes = require('./routes/route')
const path = require('path')
const userRouter = require('./routes/user.route')
const pointsCriteriaRouter = require('./routes/pointsCriteria.route')
const brandRouter = require('./routes/brand.route')
const couponRouter = require('./routes/coupon.route')
const discountRouter = require('./routes/discount.route')
const categoryRouter = require('./routes/category.route')
const tierRouter = require('./routes/tier.route')



require('./db') //DB connection
app.use(cors('*'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended:true}))

app.use(express.static(path.join(__dirname, 'build')));

app.use('/upload', express.static(path.join(__dirname, 'uploads')))


app.use('/',routes)
app.use('/api',userRouter)
app.use('/api',pointsCriteriaRouter)
app.use('/api',brandRouter)
app.use('/api',couponRouter)
app.use('/api',discountRouter)
app.use('/api',categoryRouter)
app.use('/api',tierRouter)



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(PORT,()=>{
    console.log('Server is running at '+ PORT);
})