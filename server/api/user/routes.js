const Router = require('koa-router')
const router = new Router({prefix:'/users'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/new',Controllers.createNewUser)
router.get('/',Controllers.getUsersList)



module.exports = router