const Services = require('./services')

module.exports = {
    createNewRecord: async (ctx) => {
        let body = {...ctx.request.body}
        console.log(body)
        let newRecord = await Services.createRecord(body)
        await Services.bindingCustomer(newRecord._id, body.customer)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"created new record successfully",
            payload:newRecord._id
        }
    },
    updateRecord:async(ctx)=>{
        let recordID = ctx.params.id
        let body = ctx.request.body
        await Services.updateRecord(recordID,body)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"updated record successfully"
        }
    },
    getRecordsList:async(ctx)=>{
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let createDepartment = ctx.query.createDepartment
        let payload = await Services.getPagedRecordListForDepartment(skipLength,pageSize,createDepartment)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"get records paged list successfully",
            payload
        }
    },
    searchRecordsList:async(ctx)=>{
        let searchType = ctx.params.searchType
        let keyword = ctx.query.keyword
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let createDepartment = ctx.query.createDepartment
        let payload = await Services.searchPagedRecordListForDepartment(searchType,keyword,skipLength,pageSize,createDepartment)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search records paged list successfully",
            payload
        }
    },
    searchCustomers: async (ctx) => {
        let keyword = ctx.query.keyword
        let createDepartment = ctx.query.createDepartment
        let customers = await Services.searchCustomersForDepartment(keyword, createDepartment)
        
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search customers successfully",
            payload: customers
        }
    },
    //deprecated
    searchContactByID:async(ctx)=>{
        let keyword = ctx.query.keyword
        let contacts = await Services.searchContactByID(keyword)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search contacts successfully",
            payload:contacts
        }
    },
    bindingContact:async(ctx)=>{
        let customer = await Services.updateCustomer(ctx.request.body.customerID,{contact:ctx.request.body.contactID})
        await Services.unBindingContact(customer._id,customer.contact)
        await Services.bindingContact(customer._id,ctx.request.body.contactID)
        ctx.status=201
        ctx.body = {
            code: 0,
            message: "binding success"
          }
    }
}