const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
    username: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('Login', loginSchema)
