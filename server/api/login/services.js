const Login = require('./model')
const User = require('../user/model')

module.exports = {
    validateUser: async (username, password) => {
        let user = await User.findOne({name: username}, 'password')
        
        return user.password === password
    }
}
