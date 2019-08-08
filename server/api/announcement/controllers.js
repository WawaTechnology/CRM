const Services = require('./services')

module.exports = {
    createNewAnnoun: async (ctx) => {
        let body = {...ctx.request.body}
        let newUser = await Services.createAnnoun(body)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"created new user successfully",
            payload:newUser._id
        }
    },
    getAnnounsList:async(ctx)=>{
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let payload = await Services.getPagedAnnounsList(skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"get announcement paged list successfully",
            payload
        }
    },
    searchAnnounsList:async(ctx)=>{
        let searchType = ctx.params.searchType
        let keyword = ctx.query.keyword
        let skipLength = (parseInt(ctx.query.page)-1)*parseInt(ctx.query.pageSize)
        let pageSize = parseInt(ctx.query.pageSize)
        let payload = await Services.searchPagedAnnounList(searchType,keyword,skipLength,pageSize)
        ctx.status=200
        ctx.body = {
            code:0,
            message:"search announcements paged list successfully",
            payload
        }
    },
    updateVisits:async(ctx)=>{
        let announID = ctx.params.id
        
        await Services.updateVisits(announID)
        ctx.status=201
        ctx.body = {
            code:0,
            message:"Updated visits successfully"
        }
    },
}