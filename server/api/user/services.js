const User = require('./model')

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
        if (searchType == "customerName") {
            let customers = await Customer.find({ name: { $regex: keyword, $options: "$i" } }).select('_id')
            let count = await User.count({ customer: { $in: customers.map(customer => customer._id) } })
            let users = await User.find({ customer: { $in: customers.map(customer => customer._id) } }).skip(skipLength).limit(pageSize).select('name position phone email status lastTime lastDevice')
            return {
                count,
                users
            }
        }
        let query = {}
        switch (searchType) {
            
            case "type":
                query.type = keyword
                break
            case "createDate":
                let start = moment(keyword, "YYYY-MM-DD").add(8, 'h').toDate()
                let end = moment(start).endOf('day').add(8, 'h').toDate()
                console.log(start)
                console.log(end)
                query.createDate = { $gte: start, $lt: end }
                break
            case "userDate":
                let dateStart = moment(keyword, "YYYY-MM-DD").add(8, 'h').toDate()
                let dateEnd = moment(start).endOf('day').add(8, 'h').toDate()
                console.log(dateStart)
                console.log(dateEnd)
                query.userDate = { $gte: dateStart, $lt: dateEnd }
                break
        }
        let count = await User.count(query)
        let users = await User.find().skip(skipLength).limit(pageSize).select('name position phone email status lastTime lastDevice')
        return {
            count,
            users 
        }
    },
}
