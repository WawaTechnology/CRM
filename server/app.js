const Koa = require('koa')
const app = new Koa()
const Key = require('./configuration/env')()
// 连接MongoDB by using mongoose
const mongoose = require('mongoose')
mongoose.connect(Key.databaseAddress,{ useNewUrlParser: true },(err)=>{
    if(err){
        console.log(`⚠️  :Connected failed, please check your MongoDB at ${Key.databaseAddress}`)
    }else{
        console.log(`🍟  :Successfully connected to MongoDB at ${Key.databaseAddress}`)
    }
})
mongoose.Promise = global.Promise

//basic middlewares config
const MidConfig = require('./middleware/mid-config')
app.use(MidConfig())

//Routes
const registerRouter  = require('./api/index')
app.use(registerRouter())

//Http Server
const port = Key.port
app.listen(port, () => console.log(`👻  :Server is now listening for the requests at port: ${port} `))