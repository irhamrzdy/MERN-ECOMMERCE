const mongoose = require('mongoose')
const { Schema } = mongoose;

const adminSchema = new Schema({
    username: { type: String },
    password: { type: String },
    token: { type: String }
})

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin