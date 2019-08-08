const Router = require('koa-router')
const router = new Router({prefix:'/contacts'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/new',Controllers.createNewContact)
router.get('/searchCustomers',Controllers.searchCustomers)
router.patch('/update/:id',Controllers.updateContact)
router.delete('/delete/:id',Controllers.deleteContact)
router.get('/',Controllers.getContactsList)
router.get('/search/:searchType',Controllers.searchContactsList)
router.post('/bindingCustomer', Controllers.bindingCustomer)
router.post('/unbindingCustomer', Controllers.unbindingCustomer)
module.exports = router