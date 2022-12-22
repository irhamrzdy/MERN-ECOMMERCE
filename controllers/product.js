const productRepo = require('../repository/product')

exports.createProduct = async (req, res) => {
    try {
        let payload = {
            name: req.body.name,
            price: req.body.price,
            image: req.file.path
        }
        let product = await productRepo.createProduct({
            ...payload
        })
        res.status(201).json({
            status: true,
            data: product
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        let products = await productRepo.products();
        res.status(200).json({
            status: true,
            data: products
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepo.productById(id)
        res.status(200).json({
            status: true,
            data: productDetails
        })
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: false,
            error: err
        })
    }
}

exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepo.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}