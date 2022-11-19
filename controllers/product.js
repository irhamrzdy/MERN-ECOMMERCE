const Product = require('../models/product')

module.exports = {
    index: (req, res) => {
        Product.find({}, "product_name product_price product_stock", (error, products) => {
            if (error) console.log(error)
            res.json({
                message: 'get data success',
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
    },
    show: (req, res) => {
        const id = req.params.id;
        Product.findById(id, (error, data) => {
            if (error) console.log(error)
            res.json({ product: data })
        })
    },
    update: (req, res) => {
        const productId = req.params.id;
        const productParams = req.body;
        Product.findByIdAndUpdate(productId, {
            product_name: productParams.product_name ? productParams.product_name : product_name,
            product_price: productParams.product_price ? productParams.product_price : product_price,
            product_stock: productParams.product_stock ? productParams.product_stock : product_stock
        }, { new: true }, (error, data) => {
            if (error) console.log(error)
            res.json({ message: 'update product success', product: data })
        })
    },
    delete: (req, res) => {
        const productId = req.params.id;
        Product.findByIdAndDelete(productId, (error) => {
            if (error) console.log(error)
            res.json({ message: 'product deleted' })
        })
    }
}