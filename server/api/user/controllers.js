const Services = require('./services')

module.exports = {
    createNewUser: async (ctx) => {
        let body = {...ctx.request.body}
        console.log(body)
        let newUser = await Services.createUser(body)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"created new user successfully",
            payload:newUser._id
        }
    },
    getUsersList:async(ctx)=>{
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let payload = await Services.getPagedUserList(skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"get users paged list successfully",
            payload
        }
    },
    searchUsersList:async(ctx)=>{
        let searchType = ctx.params.searchType
        let keyword = ctx.query.keyword
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let payload = await Services.searchPagedUserList(searchType,keyword,skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search users paged list successfully",
            payload
        }
    },
    updateUser:async(ctx)=>{
        let userID = ctx.params.id
        let body = ctx.request.body
        await Services.updateUser(userID,body)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"updated user successfully"
        }
    },
}