const Router = require('koa-router')
const router = new Router({prefix:'/logins'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/',Controllers.login)

module.exports = router