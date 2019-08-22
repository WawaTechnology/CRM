const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: { type: String },
    nationality: { type: String },
    position: { type: String },
    tel: { type: String },
    email: { type: String },
    wechat: { type: String },
    createDepartment: { type: String },
    serviceCustomers: [{ type: String ,ref:'Customer'}]
})

module.exports = mongoose.model('Contact', contactSchema)
