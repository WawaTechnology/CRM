const User = require('./model')
const moment = require('moment')

module.exports = {
    createUser: async (body) => {
        return await User.create(body)
    },
    getPagedUserList: async (skipLength, pageSize) => {
        let count = await User.count()
        let users = await User.find().skip(skipLength).limit(pageSize).select('name position phone email status lastTime lastDevice')
        return {
            count,
            users
        }
    },
    searchPagedUserList: async (searchType, keyword, skipLength, pageSize) => {
        let query = {}
        switch (searchType) { 
            case "name":
                query.name = { $regex: keyword, $options: "$i" }
                break
            case "position":
                query.position = keyword
                break
            case "status":
                query.status = keyword
                break
            case "lastTime":
                let start = moment(keyword, "YYYY-MM-DD").add(8, 'h').toDate()
                let end = moment(start).endOf('day').add(8, 'h').toDate() 
                console.log(start)
                console.log(end)
                query.lastTime = { $gte: start, $lt: end }
                break
            case "phone":
                query.phone = { $regex: keyword, $options: "$i" }
                break
        }
        let count = await User.count(query)
        let users = await User.find(query).skip(skipLength).limit(pageSize).select('name position phone email status lastTime lastDevice')
        return {
            count,
            users 
        }
    },
    updateUser: async (userID, body) => {
        return await User.findByIdAndUpdate(userID, body)
    },
}
