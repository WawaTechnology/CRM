const Router = require('koa-router')
const router = new Router({prefix:'/records'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/new',Controllers.createNewRecord)
router.patch('/update/:id',Controllers.updateRecord)
router.get('/',Controllers.getRecordsList)
router.get('/search/:searchType',Controllers.searchRecordsList)
router.get('/searchCustomers',Controllers.searchCustomers)

module.exports = router