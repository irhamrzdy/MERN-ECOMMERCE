const mongoose = require('mongoose')
const { Schema } = mongoose

const customerSchema = new Schema(
    {
        first_name: { type: String, default: null },
        last_name: { type: String, default: null },
        email: { type: String, unique: true },
        password: { type: String },
        token: { type: String }
    }, {
    timestamps: true
}
)

const Customer = mongoose.model("Customer", customerSchema)
module.exports = Customer;