const Services = require('./services')

module.exports = {
    createNewContact: async (ctx) => {
        let body = {...ctx.request.body}
        let newContact = await Services.createContact(body)
        if(ctx.query.bindingCustomer){
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