const compose = require('koa-compose')

//Logger
async function logger(ctx, next){
    const start = Date.now()
    await next()
    const s = (Date.now() - start)/1000 + ' 秒'
    let info = {
        status:ctx.status,
        method:ctx.method,
        url:ctx.url,
        parameters:ctx.params,
        queryStrings:ctx.query,
        reqBody:ctx.request.body,
        resBody:ctx.body,
        cost:s
    }
    console.log(info)
}

//Handling Error
async function errorHandling(ctx, next){
    try {
        await next()
    } catch (err) {
        console.log(err)
        ctx.body = {
            code:err.code || 500,
            message:err.message
        }
    }
}

//Parsing the Body
const bodyParser = require('koa-bodyparser')

//Handling CORS
const cors = require('koa2-cors')


module.exports = ()=>{
    return compose([logger,errorHandling,bodyParser(),cors()])
}