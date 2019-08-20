const Services = require('./services')

module.exports = {
    login: async (ctx) => {
        let username = ctx.request.body.name
        let password = ctx.request.body.password
        
        let user = await Services.findUser(username)
        console.log(user)
        if (user.password === password) {
            user.password = ""
            ctx.status = 200
            ctx.body = {
                code: 0,
                message: "login successfully",
                _id: user._id,
                user: user
            }
        } else {
            ctx.status = 200
            ctx.body = {
                code: 1,
                message: "name or password is wrong"
            }
        }

    }
}