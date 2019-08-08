const mongoose = require('mongoose')

const announcementSchema = mongoose.Schema({
    visits: { type: Number, default: 0},
    title: { type: String },
    content: { type: String },
    poster: { type: String },
    createTime: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Announcement', announcementSchema)
