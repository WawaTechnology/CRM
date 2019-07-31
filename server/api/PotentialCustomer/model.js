const mongoose = require('mongoose')

const potentialCustomerSchema = mongoose.Schema({
    key: { type: String }
})

module.exports = mongoose.model('PotentialCustomer', potentialCustomerSchema)
