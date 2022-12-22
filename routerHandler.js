const productRoutes = require('./routes/product')
module.exports = (app) => {
    app.use('/api/product', productRoutes)
}