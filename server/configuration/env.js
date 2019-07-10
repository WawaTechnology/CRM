const pro = require('./pro')
const dev = require('./dev')

const env = 'dev'   //只需修改此处以切换环境

module.exports = () => {
    return env === 'dev' ? dev : pro
}