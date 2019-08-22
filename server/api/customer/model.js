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
    lastTimeVisit: { type: Date,default:new Date(0)},
    nextTimeVisit: { type: Date },
    staff: { type: String },
    attribute: { type: String },
    coStaff: [{ type: String }],
    phone: { type: String }
})

module.exports = mongoose.model('Customer', customerSchema)
