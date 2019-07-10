const Contact = require('./model')
const Customer = require('../customer/model')
module.exports = {
    createContact: async (body) => {
        return await Contact.create(body)
    },
    bindingCustomer: async (contactID, customer) => {
        return await Contact.findByIdAndUpdate(contactID, { $addToSet: { serviceCustomers: customer } })
    },
    searchCustomers: async (keyword) => {
        let query = {
            name: { $regex: keyword, $options: "$i" }
        }
        return await Customer.find(query).select('name')
    },
    updateContact: async (contactID, body) => {
        return await Contact.findByIdAndUpdate(contactID, body)
    },
    getPagedContactList: async (skipLength, pageSize) => {
        let count = await Contact.count()
        let contacts = await Contact.find().skip(skipLength).limit(pageSize).populate({path:'serviceCustomers',select:'name'}).select('name tel position')
        return {
            count,
            contacts
        }
    },
    searchPagedContactList: async (searchType, keyword, skipLength, pageSize) => {
        let query = {}
        switch (searchType) {
            case "name":
                query.name = { $regex: keyword, $options: "$i" }
                break
            case "tel":
                query.tel = { $regex: keyword, $options: "$i" }
        }
        let count = await Contact.count(query)
        let contacts = await Contact.find(query).skip(skipLength).limit(pageSize).populate({path:'serviceCustomers',select:'name'}).select('name tel position')
        return {
            count,
            contacts
        }
    }
}
