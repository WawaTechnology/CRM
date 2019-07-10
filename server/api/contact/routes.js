const Router = require('koa-router')
const router = new Router({prefix:'/contacts'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/new',Controllers.createNewContact)
router.get('/searchCustomers/:keyword',Controllers.searchCustomers)
router.patch('/update/:id',Controllers.updateContact)
router.get('/',Controllers.getContactsList)
router.get('/search/:searchType',Controllers.searchContactsList)


module.exports = router