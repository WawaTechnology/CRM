const Customer = require('./model')
const Contact = require('../contact/model')
const Contract = require('../contract/model')
module.exports = {
    createCustomer: async (body) => {
        return await Customer.create(body)
    },
    searchContactsForDepartment: async (keyword, createDepartment) => {
        let query = {
            name: { $regex: keyword, $options: "$i" },
            createDepartment: createDepartment
        }
        return await Contact.find(query).select('name')
    },
    updateCustomer: async (customerID, body) => {
        return await Customer.findByIdAndUpdate(customerID, body,{upsert:true})
    },
    deleteCustomer: async (customerID) => {
        return await Customer.findByIdAndRemove(customerID)
    },
    findCustomer: async (customerID) => {
        return await Customer.findById(customerID)
    },
    getPagedCustomerList: async (skipLength, pageSize) => {
        let count = await Customer.count()
        let customers = await Customer.find().skip(skipLength).limit(pageSize).populate({path:'contact',select:'name tel position'}).select('name contact staff status attribute level lastTimeVisit email address department duration phone')
        return {
            count,
            customers
        }
    },
    getPagedCustomerListForDepartment: async (skipLength, pageSize, department) => {
        let count = await Customer.find({ department: department }).count()
        let customers = await Customer.find({ department: department }).skip(skipLength).limit(pageSize).populate({path:'contact',select:'name tel position'}).select('name contact staff status attribute level lastTimeVisit email address department duration phone')
        return {
            count,
            customers
        }
    },
    searchPagedCustomerListForDepartment: async (searchType, keyword, skipLength, pageSize, department) => {
        if (searchType == "contactName") {
            let contacts = await Contact.find({ name: { $regex: keyword, $options: "$i" } }).select('_id')
            let count = await Customer.count({ contact: { $in: contacts.map(contact => contact._id) } })
            let customers = await Customer.find({ contact: { $in: contacts.map(contact => contact._id) }, department: department }).skip(skipLength).limit(pageSize).populate({path:'contact',select:'name tel position'}).select('name contact staff status attribute level lastTimeVisit email address department duration phone')
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
        query.department = department
        let count = await Customer.count(query)
        let customers = await Customer.find(query).skip(skipLength).limit(pageSize).populate({path:'contact',select:'name tel position'}).select('name contact staff status attribute level lastTimeVisit email address department duration phone')
        return {
            count,
            customers
        }
    },
    //跟进记录和合同都要更新
    unBindingContact:async(customerID,contactID)=>{
        await Contact.findByIdAndUpdate(contactID,{$pull:{serviceCustomers:customerID}})
    },
    bindingContact:async(customerID,contactID)=>{
        await Contact.findByIdAndUpdate(contactID,{$addToSet:{serviceCustomers:customerID}})
    }
}
