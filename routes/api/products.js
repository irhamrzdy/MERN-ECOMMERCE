const express = require('express')
const router = express.Router()

const productController = require('../../controllers/product')

router.route("/products").get(productController.index).post(productController.store);

module.exports = router;