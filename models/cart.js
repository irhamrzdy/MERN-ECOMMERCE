const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can't be less than 1."]
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, { timestamps: true }
)

const cartSchema = new Schema({
    items: [itemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model("Cart", cartSchema);