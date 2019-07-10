const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name: { type: String },
    logo:{type:String},
    level: { type: String },
    status: { type: String },
    contact:{type:String,ref:'Contact'},
    contract:{type:String,ref:'Contract'},
    address: { type: String },
    email: { type: String },
    department: { type: String },
    duration: { type: String },
    lastTimeVisit: { type: String },
    nextTimeVisit: { type: String },
    staff: { type: String },
    attribute: { type: String },
    coStaff: [{ type: String }],
    phone: { type: String }
})

module.exports = mongoose.model('Customer', customerSchema)
