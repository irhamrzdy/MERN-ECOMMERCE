const express = require('express')
const adminRouter = require('./routes/api/admin')
const productRouter = require('./routes/api/products')
const customerRouter = require('./routes/api/customer')
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 3001;

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mern-ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api', adminRouter)
app.use('/api', productRouter)
app.use('/api', customerRouter)

app.listen(PORT, () => console.log(`Started on PORT ${PORT}`))