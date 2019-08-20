const Login = require('./model')
const User = require('../user/model')

module.exports = {
    findUser: async (username) => {
        let user = await User.findOne({name: username}, 'name position department phone email status lastTime lastDevice password')
        
        return user
    }
}
