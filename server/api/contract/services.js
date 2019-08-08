const Contract = require('./model')
const Contact = require('../contact/model')
const Customer = require('../customer/model')
const moment = require('moment')

module.exports = {
    createContract: async (body) => {
        return await Contract.create(body)
    },
    getPagedContractsList: async (skipLength,pageSize) => {
        let count = await Contract.count()
        let contracts = await Contract.find().skip(skipLength).limit(pageSize).populate({path: 'customer signatory', select: 'name'}).select('name startDate endDate duration staff staffInCharge description createDate')
        return {
            count,
            contracts
        }
    },
    getAllStaff: async () => {
        let allStaff = await Contact.find().select('name')
        return {
            allStaff
        }
    },
    searchPagedContractsList: async (searchType, keyword, skipLength, pageSize) => {
        if (searchType == "customerName") {
            let customers = await Customer.find({ name: { $regex: keyword, $options: "$i" } }).select('_id')
            let count = await Contract.count({ customer: { $in: customers.map(customer => customer._id) } })
            let contracts = await Contract.find({ customer: { $in: customers.map(customer => customer._id) } }).skip(skipLength).limit(pageSize).populate({path: 'customer', select: 'name'}).select('name createDate endDate duration staff staffInCharge description')
            return {
                count,
                contracts
            }
        }
        let query = {}
        switch (searchType) {
            case "startDate":
                let start = moment(keyword, "YYYY-MM-DD").add(8, 'h').toDate()
                let end = moment(start).endOf('day').add(8, 'h').toDate()
                console.log(start)
                console.log(end)
                query.createDate = { $gte: start, $lt: end }
                break
            case "duration":
                query.duration = { $regex: keyword, $options: "$i" }
                break
            case "staff":
                query.staff = { $regex: keyword, $options: "$i" }
                break
            case "staffInCharge":
                query.staffInCharge = { $regex: keyword, $options: "$i" }
                break
           
        }
        let count = await Contract.count(query)
        let contracts = await Contract.find(query).skip(skipLength).limit(pageSize).populate({path: 'customer', select: 'name'}).select('name createDate endDate duration staff staffInCharge description')
        return {
            count,
            contracts
        }
    },
    searchCustomers: async (keyword) => {
        let query = {
            name: { $regex: keyword, $options: "$i" }
        }
        return await Customer.find(query).populate({ path: "contact", select: 'name' }).select('name')
    },
    searchContacts: async (keyword) => {
        let query = {
            name: { $regex: keyword, $options: "$i" }
        }
        return await Contact.find(query).select('name')
    },
    updateContract: async (contractID, body) => {
        return await Contract.findByIdAndUpdate(contractID, body) 
    },
    bindingCustomer: async (contractID, customerID) => {
        await Customer.findByIdAndUpdate(customerID, {contract:contractID},{upsert: true})
        
    }
}
