const Services = require('./services')

module.exports = {
    createNewContract: async (ctx) => {
        let body = {...ctx.request.body}
        let newContract = await Services.createContract(body)
        console.log(newContract)
        console.log(body.customer)
        await Services.bindingCustomer(newContract._id, body.customer)
        
        ctx.status=201
        ctx.body = {
            code:0,
            message:"created new contract successfully",
            payload:newContract._id
        }

    },
    getContractsList: async (ctx) => {
        let pageSize = parseInt(ctx.query.pageSize)
        let skipLength = (parseInt(ctx.query.page)-1)*pageSize
        let payload = await Services.getPagedContractsList(skipLength,pageSize)
        ctx.status = 200
        ctx.body = {
            code: 0,
            message: 'get contracts paged list successfully',
            payload
        }
    },
    getAllStaff: async (ctx) => {
        let payload = await Services.getAllStaff()
        ctx.status = 200
        ctx.body = {
            code: 0,
            message: 'get all staff successfully',
            payload
        }
    },
    searchContractsList: async(ctx) => {
        let searchType = ctx.params.searchType
        let keyword = ctx.query.keyword
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        console.log('-----------------')
        console.log(typeof(keyword))
        let payload = await Services.searchPagedContractsList(searchType,keyword,skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search contracts paged list successfully",
            payload
        }
    },
    searchCustomers: async (ctx) => {
        let keyword = ctx.query.keyword
        let customers = await Services.searchCustomers(keyword)
        ctx.status = 200
        ctx.body = {
            code: 0,
            message: "Search Customers Successfully",
            payload: customers
        }
    },
    searchContacts: async (ctx) => {
        let keyword = ctx.query.keyword
        let contacts = await Services.searchContacts(keyword)
        ctx.status = 200
        ctx.body = {
            code: 0,
            message: "Search Contacts Successfully",
            payload: contacts
        }
    },
    updateContract: async (ctx) => {
        let contractID = ctx.params.id
        let body = ctx.request.body
        
        await Services.updateContract(contractID, body)
        ctx.status = 201
        ctx.body = {
            code:0,
            message:"Updated contract successfully"
        }

    },
    bindingCustomer: async (ctx) => {
        let contract = await Services.updateContract(ctx.request.body.contractID, {customer: ctx.request.body.customer})
        await Services.bindingCustomer(contract._id, ctx.request.body.customer)
        ctx.status=201
        ctx.body = {
            code: 0,
            message: "binding success"
          }
    }
}