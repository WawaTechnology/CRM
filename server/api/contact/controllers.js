const Services = require('./services')

module.exports = {
    createNewContact: async (ctx) => {
        let body = {...ctx.request.body}
        let newContact = await Services.createContact(body)
        
        if(ctx.query.bindingCustomer){
            console.log("I am in")
            await Services.bindingCustomer(newContact._id,ctx.query.bindingCustomer)
        }

        ctx.status=201
        ctx.body = {
            code:0,
            message:"created new contact successfully",
            payload:newContact._id
        }
    },
    searchCustomers:async(ctx)=>{
        let keyword = ctx.query.keyword
        let customers = await Services.searchCustomers(keyword)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search customers successfully",
            payload:customers
        }
    },
    updateContact:async(ctx)=>{
        let contactID = ctx.params.id
        let body = ctx.request.body
        await Services.updateContact(contactID,body)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"Updated contact successfully"
        }
    },
    deleteContact:async(ctx)=>{
        let contactID = ctx.params.id
        let contact = await Services.deleteContact(contactID)
        console.log(contact)
        await Services.unBindingCustomer(contactID,contact.contact)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"delete contact successfully"
        }
    },
    getContactsList:async(ctx)=>{
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let payload = await Services.getPagedContactList(skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"get contacts paged list successfully",
            payload
        }
    },
    //后台跟前台同名但是意义好像不一样
    //这里是对Customer进行绑定，
    bindingCustomer:async(ctx)=>{
        let contact = await Services.bindingContact(ctx.request.body.contactID, ctx.request.body.customerID)
        let customer = await Services.findCustomer(ctx.request.body.customerID)
        // await Services.unBindingCustomer(contact._id,contact.serviceCustomer)
        await Services.unBindingContact(customer.contact, customer._id)
        await Services.bindingCustomer(contact._id,ctx.request.body.customerID)
        ctx.status=201
        ctx.body = {
            code: 0,
            message: "binding customer success"
          }
    },
    unbindingCustomer:async(ctx)=>{
        
        await Services.unBindingCustomer(ctx.request.body.customerID)
        await Services.unBindingContact(ctx.request.body.contactID, ctx.request.body.customerID)
        ctx.status=201
        ctx.body = {
            code: 0,
            message: "unbinding success"
          }
    },
    searchContactsList:async(ctx)=>{
        let searchType = ctx.params.searchType
        let keyword = ctx.query.keyword
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let payload = await Services.searchPagedContactList(searchType,keyword,skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search contacts paged list successfully",
            payload
        }
    }
}