const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema(
    {
        product_name: String,
        product_price: Number,
        product_stock: Number
    },
    { timestamps: true }
)

const Product = mongoose.model("Product", productSchema)
module.exports = Product;