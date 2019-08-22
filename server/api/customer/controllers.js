const Services = require('./services')

module.exports = {
    createNewCustomer: async (ctx) => {
        let body = {...ctx.request.body}
        if(ctx.query.bindingContact){
            body.contact = ctx.query.bindingContact
        }
        console.log(ctx)
        let newCustomer = await Services.createCustomer(body)
        if(body.contact){
            // 在contact表中加入customer
            await Services.bindingContact(newCustomer._id,body.contact)
        }
        ctx.status=201
        ctx.body = {
            code:0,
            message:"created new customer successfully",
            payload:newCustomer._id
        }
    },
    searchContacts:async(ctx)=>{
        let keyword = ctx.query.keyword
        let department = ctx.query.department
        let contacts = await Services.searchContactsForDepartment(keyword, department)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search contacts successfully",
            payload:contacts
        }
    },
    updateCustomer:async(ctx)=>{
        let customerID = ctx.params.id
        let body = ctx.request.body
        await Services.updateCustomer(customerID,body)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"Updated customer successfully"
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
    },
    deleteCustomer:async(ctx)=>{
        let customerID = ctx.params.id
        let customer = await Services.deleteCustomer(customerID)
        console.log(customer)
        await Services.unBindingContact(customerID,customer.contact)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"delete customer successfully"
        }
    },
    getCustomersList:async(ctx)=>{
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let department = ctx.query.department
        let payload = await Services.getPagedCustomerListForDepartment(skipLength,pageSize,department)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"get customers paged list successfully",
            payload
        }
    },
    searchCustomersList:async(ctx)=>{
        let searchType = ctx.params.searchType
        let keyword = ctx.query.keyword
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let department = ctx.query.department
        let payload = await Services.searchPagedCustomerListForDepartment(searchType,keyword,skipLength,pageSize,department)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search customers paged list successfully",
            payload
        }
    },
    
}