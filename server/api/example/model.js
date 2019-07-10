const mongoose = require('mongoose')

const exampleSchema = mongoose.Schema({
    key: { type: String }
})

module.exports = mongoose.model('Example', exampleSchema)