const Product = require('../models/product')

module.exports = {
    index: async (req, res) => {
        try {
            const products = await Product.find({}, "product_name product_price product_stock");
            res.json({ message: 'Success', products: products })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    store: async (req, res) => {
        const product = new Product({
            product_name: req.body.product_name,
            product_price: req.body.product_price,
            product_stock: req.body.product_stock
        })

        try {
            const newProduct = await product.save();
            res.status(201).json({ message: 'Success Insert Product!', product: newProduct })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    show: async (req, res) => {
        const id = req.params.id;
        try {
            const product = await Product.findById(id);
            res.json({ product: product })
        } catch (error) {
            res.status(404).json({ message: 'Product not found' })
        }
    },
    update: async (req, res) => {
        const productId = req.params.id;
        const productParams = req.body;
        try {
            const selectedProduct = await Product.findByIdAndUpdate(productId, {
                product_name: productParams.product_name ? productParams.product_name : product_name,
                product_price: productParams.product_price ? productParams.product_price : product_price,
                product_stock: productParams.product_stock ? productParams.product_stock : product_stock
            }, { new: true })
            res.status(200).json({ message: 'Success Update Product', product: selectedProduct })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    delete: async (req, res) => {
        const productId = req.params.id;
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId)
            res.status(200).json({ message: 'Product Deleted', deleted_product: deletedProduct })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}