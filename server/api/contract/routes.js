const Router = require('koa-router')
const router = new Router({prefix:'/contracts'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/new', Controllers.createNewContract)
router.get('/', Controllers.getContractsList)
router.get('/search/:searchType',Controllers.searchContractsList)
router.get('/searchContacts',Controllers.searchContacts)
router.get('/searchCustomers',Controllers.searchCustomers)
router.get('/allStaff', Controllers.getAllStaff)
router.patch('/update/:id', Controllers.updateContract)
module.exports = router