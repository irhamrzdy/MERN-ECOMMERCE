const Cart = require('../models/cart')

module.exports = {
    cart: async () => {
        const carts = await Cart.find().populate({
            path: 'items.productId',
            select: "name price total"
        })
        return carts[0];
    },
    addItem: async payload => {
        const newItem = await Cart.create(payload)
        return newItem;
    }
}