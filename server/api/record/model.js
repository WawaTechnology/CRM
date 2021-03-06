const mongoose = require('mongoose')

const recordSchema = mongoose.Schema({
    remark: { type : String },
    createDate: { type: Date, default: Date.now },
    recordDate: { type : Date},
    feedback: { type: String },
    type: { type : String },
    staff: { type: String },
    createDepartment: { type: String },
    customer: { type: String, ref: 'Customer' },
    contactName: { type: String }
})

module.exports = mongoose.model('Record', recordSchema)
