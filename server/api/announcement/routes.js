const Router = require('koa-router')
const router = new Router({prefix:'/announcements'}) // 业务一级路由用复数
const Controllers = require('./controllers')

router.post('/new',Controllers.createNewAnnoun)
router.get('/',Controllers.getAnnounsList)
router.get('/search/:searchType', Controllers.searchAnnounsList)
router.get('/update/:id', Controllers.updateVisits)

module.exports = router