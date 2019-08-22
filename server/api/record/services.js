const Record = require('./model')
const Customer = require('../customer/model')
const Contact = require('../contact/model')
const moment = require('moment')

module.exports = {
    createRecord: async (body) => {
        return await Record.create(body)
    },
    bindingCustomer: async (RecordID, customer) => {
        return await Record.findByIdAndUpdate(RecordID, { customer: customer }, { upsert: true} )
    },
    searchCustomersForDepartment: async (keyword, createDepartment) => {
        let query = {
            name: { $regex: keyword, $options: "$i" },
            department: createDepartment
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
        let records = await Record.find().skip(skipLength).limit(pageSize).populate({path:'customer',select:'name'}).select('contactName remark createDate recordDate feedback type staff workingStaff')
        return {
            count,
            records
        }
    },
    getPagedRecordListForDepartment: async (skipLength, pageSize, createDepartment) => {
        let count = await Record.find({ createDepartment: createDepartment }).count()
        let records = await Record.find({ createDepartment: createDepartment }).skip(skipLength).limit(pageSize).populate({path:'customer',select:'name'}).select('contactName remark createDate recordDate feedback type staff workingStaff')
        return {
            count,
            records
        }
    },
    searchPagedRecordListForDepartment: async (searchType, keyword, skipLength, pageSize, createDepartment) => {
        if (searchType == "customerName") {
            let customers = await Customer.find({ name: { $regex: keyword, $options: "$i" } }).select('_id')
            let count = await Record.count({ customer: { $in: customers.map(customer => customer._id) } })
            let records = await Record.find({ customer: { $in: customers.map(customer => customer._id) }, createDepartment: createDepartment }).skip(skipLength).limit(pageSize).populate({path: 'customer', select: 'name'}).select('contactName remark createDate recordDate feedback type staff workingStaff')
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
            case "staff":
                query.staff = { $regex: keyword, $options: "$i" }
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
        query.createDepartment = createDepartment
        let count = await Record.count(query)
        let records = await Record.find(query).skip(skipLength).limit(pageSize).populate({path:'customer',select:'name'}).select('contactName remark createDate recordDate feedback type staff workingStaff')
        return {
            count,
            records 
        }
    },
    
}
