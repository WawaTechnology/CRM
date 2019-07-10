const Services = require('./services')

module.exports = {
    createNewCustomer: async (ctx) => {
        let body = {...ctx.request.body}
        if(ctx.query.bindingContact){
            body.contact = ctx.query.bindingContact
        }
        let newCustomerID = await Services.createCustomer(body)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"created new customer successfully",
            payload:newCustomerID
        }
    },
    searchContacts:async(ctx)=>{
        let keyword = ctx.params.keyword
        let contacts = await Services.searchContacts(keyword)
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
    getCustomersList:async(ctx)=>{
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let payload = await Services.getPagedCustomerList(skipLength,pageSize)
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
        let payload = await Services.searchPagedCustomerList(searchType,keyword,skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search customers paged list successfully",
            payload
        }
    }
}