const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please include the product name"],
        },
        price: {
            type: String,
            required: [true, "Please include the product price"]
        },
        image: {
            type: String,
            required: true
        }
    }
);

const Product = mongoose.model("Product", productSchema)
module.exports = Product;