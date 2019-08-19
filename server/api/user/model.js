const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    position: { type: String },
    status: { type: String, default: "在职" },
    lastTime: { type: Date, default: new Date(0)},
    lastDevice: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('User', userSchema)
