const Customer = require('./model')
const Contact = require('../contact/model')
module.exports = {
    createCustomer: async (body) => {
        return await Customer.create(body)
    },
    searchContacts: async (keyword) => {
        let query = {
            name: { $regex: keyword, $options: "$i" }
        }
        return await Contact.find(query).select('name')
    },
    updateCustomer: async (customerID, body) => {
        return await Customer.findByIdAndUpdate(customerID, body)
    },
    getPagedCustomerList: async (skipLength, pageSize) => {
        let count = await Customer.count()
        let customers = await Customer.find().skip(skipLength).limit(pageSize)
        return {
            count,
            customers
        }
    },
    searchPagedCustomerList: async (searchType, keyword, skipLength, pageSize) => {
        if (searchType == "contactName") {
            let contacts = await Contact.find({ name: { $regex: keyword, $options: "$i" } }).select('_id')
            let count = await Customer.count({ contact: { $in: contacts.map(contact => contact._id) } })
            let customers = await Customer.find({ contact: { $in: contacts.map(contact => contact._id) } }).skip(skipLength).limit(pageSize)
            return {
                count,
                customers
            }
        }
        let query = {}
        switch (searchType) {
            case "name":
                query.name = { $regex: keyword, $options: "$i" }
                break
            case "phone":
                query.phone = { $regex: keyword, $options: "$i" }
                break
            case "staff":
                query.staff = { $regex: keyword, $options: "$i" }
                break
            case "status":
                query.status = keyword
                break
            case "attribute":
                query.attribute = keyword
                break
            case "level":
                query.level = keyword
        }
        let count = await Customer.count(query)
        let customers = await Customer.find(query).skip(skipLength).limit(pageSize)
        return {
            count,
            customers
        }
    }
}
