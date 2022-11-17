const Product = require('../models/product')

module.exports = {
    index: (req, res) => {
        Product.find({}, "product_name product_price product_stock", (error, products) => {
            if (error) console.log(error)
            res.json({
                products: products
            })
        })
    },
    store: (req, res) => {
        const product = new Product({
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_stock: req.body.product_stock
        })

        product.save((err, result) => {
            if (!product.product_name) {
                res.json(err);
            }
            res.json({
                message: 'Success Insert Product!',
                product: result
            })
        })
    }
}