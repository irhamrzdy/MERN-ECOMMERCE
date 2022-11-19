const express = require('express')
const router = express.Router()

const productController = require('../../controllers/product')

router.route("/products").get(productController.index).post(productController.store);
router.route("/products/:id").get(productController.show).put(productController.update).delete(productController.delete);

module.exports = router;