const Router = require('koa-router')
const router = new Router({prefix:'/customers'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/new',Controllers.createNewCustomer)
router.get('/searchContacts',Controllers.searchContacts)
router.patch('/update/:id',Controllers.updateCustomer)
router.delete('/delete/:id',Controllers.deleteCustomer)
router.get('/',Controllers.getCustomersList)
router.get('/search/:searchType',Controllers.searchCustomersList)
router.post('/bindingContact',Controllers.bindingContact)

module.exports = router