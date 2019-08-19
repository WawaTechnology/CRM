const Announcement = require('./model')
const moment = require('moment')

module.exports = {
    createAnnoun: async (body) => {
        return await Announcement.create(body)
    },
    getPagedAnnounsList: async (skipLength, pageSize) => {
        let count = await Announcement.count()
        let announs = await Announcement.find().skip(skipLength).limit(pageSize).select('title content visits poster createTime')
        return {
            count,
            announs
        }
    },
    searchPagedAnnounsList: async (searchType, keyword, skipLength, pageSize) => {
        let query = {}
        switch (searchType) { 
            case "title":
                query.title = { $regex: keyword, $options: "$i" }
                break
            case "createTime":
                let start = moment(keyword, "YYYY-MM-DD").add(8, 'h').toDate()
                let end = moment(start).endOf('day').add(8, 'h').toDate() 
                console.log(start)
                console.log(end)
                query.createTime = { $gte: start, $lt: end }
                break
            case "visits":
                query.visits = keyword
                break
        }
        let count = await Announcement.count(query)
        let announs = await Announcement.find(query).skip(skipLength).limit(pageSize).select('title content visits poster createTime')
        return {
            count,
            announs 
        }
    },
    updateVisits: async (announID) => {
        let announ = await Announcement.findById(announID)
        return await Announcement.findByIdAndUpdate(announID, {visits: announ.visits +1})
    },
}
