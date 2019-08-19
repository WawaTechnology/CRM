const Services = require('./services')

module.exports = {
    login: async (ctx) => {
        let username = ctx.request.body.name
        let password = ctx.request.body.password
        
        let isTrue = await Services.validateUser(username, password)
        
        if (isTrue) {
            ctx.status = 200
            ctx.body = {
                code: 0,
                message: "login successfully"
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