const Record = require('./model')
const Customer = require('../customer/model')
const Contact = require('../contact/model')

module.exports = {
    createRecord: async (body) => {
        return await Record.create(body)
    },
    bindingCustomer: async (RecordID, customer) => {
        return await Record.findByIdAndUpdate(RecordID, { $addToSet: { customer: customer } })
    },
    searchCustomers: async (keyword) => {
        let query = {
            name: { $regex: keyword, $options: "$i" }
        }
        return await Customer.find(query).populate({ path: 'contact', select: 'name'}).select('name')
    },
    searchContacts: async (keyword) => {
        let query = {
            name: { $regex: keyword, $options: "$i" }
        }
        return await Contact.find(query).select('name')
    },
    searchContactByID: async (id) => {
        let query = {
            _id: id
        }
        return await Contact.find(query).select('name')
    },
    updateRecord: async (recordID, body) => {
        return await Record.findByIdAndUpdate(recordID, body)
    },
    getPagedRecordList: async (skipLength, pageSize) => {
        let count = await Record.count()
        let records = await Record.find().skip(skipLength).limit(pageSize).populate({path:'customer',select:'name'}).select('name remark createDate recordDate feedback type staff workingStaff')
        return {
            count,
            records
        }
    },
    searchPagedRecordList: async (searchType, keyword, skipLength, pageSize) => {
        if (searchType == "customerName") {
            let customers = await Customer.find({ name: { $regex: keyword, $options: "$i" } }).select('_id')
            let count = await Record.count({ customer: { $in: customers.map(customer => customer._id) } })
            let records = await Record.find({ customer: { $in: customers.map(customer => customer._id) } }).skip(skipLength).limit(pageSize).populate({path: 'customer', select: 'name'}).select('name remark createDate recordDate feedback type staff workingStaff')
            return {
                count,
                records
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
            case "recordDate":
                let dateStart = moment(keyword, "YYYY-MM-DD").add(8, 'h').toDate()
                let dateEnd = moment(start).endOf('day').add(8, 'h').toDate()
                console.log(dateStart)
                console.log(dateEnd)
                query.recordDate = { $gte: dateStart, $lt: dateEnd }
                break
        }
        let count = await Record.count(query)
        let records = await Record.find().skip(skipLength).limit(pageSize).populate({path:'customer',select:'name'}).select('name remark createDate recordDate feedback type staff workingStaff')
        return {
            count,
            records 
        }
    },
    
}
