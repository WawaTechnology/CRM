const Contact = require('./model')
const Customer = require('../customer/model')
module.exports = {
    createContact: async (body) => {
        console.log("i am create")
        return await Contact.create(body)
    },
    searchCustomersForDepartment: async (keyword, createDepartment) => {
        let query = {
            name: { $regex: keyword, $options: "$i" },
            department: createDepartment
        }
        return await Customer.find(query).select('name')
    },
    updateContact: async (contactID, body) => {
        return await Contact.findByIdAndUpdate(contactID, body)
    },
    deleteContact: async (contactID) => {
        return await Contact.findByIdAndRemove(contactID)
    },
    findCustomer: async (customerID) => {
        return await Customer.findById(customerID)
    },
    getPagedContactList: async (skipLength, pageSize) => {
        let count = await Contact.count()
        let contacts = await Contact.find().skip(skipLength).limit(pageSize).populate({path:'serviceCustomers',select:'name'}).select('name tel position nationality wechat email')
        return {
            count,
            contacts
        }
    },
    getPagedContactListForDepartment: async (skipLength, pageSize, createDepartment) => {
        let count = await Contact.find({ createDepartment: createDepartment }).count()
        let contacts = await Contact.find({ createDepartment: createDepartment }).skip(skipLength).limit(pageSize).populate({path:'serviceCustomers',select:'name'}).select('name tel position nationality wechat email')
        return {
            count,
            contacts
        }
    },
    searchPagedContactListForDepartment: async (searchType, keyword, skipLength, pageSize, createDepartment) => {  
        let query = {}
        switch (searchType) {
            case "name":
                query.name = { $regex: keyword, $options: "$i" }
                break
            case "tel":
                query.tel = { $regex: keyword, $options: "$i" }
        }
        query.createDepartment = createDepartment
        let count = await Contact.count(query)
        let contacts = await Contact.find(query).skip(skipLength).limit(pageSize).populate({path:'serviceCustomers',select:'name'}).select('name tel position nationality wechat email')
        return {
            count,
            contacts
        }
    },
    bindingCustomer: async (contactID, customerID) => {
        return await Customer.findByIdAndUpdate(customerID, { contact: contactID }, {upsert: true} )
    },
    unBindingCustomer:async(customerID)=>{
        await Customer.findByIdAndUpdate(customerID, {$unset: {contact: ""}})
    },
    unBindingContact:async(contactID,customerID)=>{
        await Contact.findByIdAndUpdate(contactID,{$pull:{serviceCustomers:customerID}})
    },
    bindingContact:async(contactID,customerID)=>{
        return await Contact.findByIdAndUpdate(contactID,{$addToSet:{serviceCustomers:customerID}})
    }
}
