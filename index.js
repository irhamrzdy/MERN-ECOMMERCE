const express = require('express')
const productRouter = require('./routes/api/products')

const app = express();
app.use(express.json())

const PORT = 3001;

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mern-ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api', productRouter)

app.listen(PORT, () => console.log(`Started on PORT ${PORT}`))