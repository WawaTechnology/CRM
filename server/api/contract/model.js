const mongoose = require('mongoose')

const contractSchema = mongoose.Schema({
    name: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    duration: { type: String },
    signatory: { type: String, ref: 'Contact' },
    staff: { type: String },
    staffInCharge: { type: String },
    createDate: { type: Date, default: Date.now },
    customer: { type: String, ref: 'Customer' }
})

module.exports = mongoose.model('Contract', contractSchema)
