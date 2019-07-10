const Services = require('./services')

module.exports = {
    sayHello: async (ctx) => {
        // 1.解析ctx 
        //   [ctx.params]
        //   [ctx.query]
        //   [ctx.request.body]
        // 2.调用 services
        // 3.返回 ctx.body
        ctx.body =  
        `
        <div style="display: flex;align-items: center;justify-content: center;position: fixed;top: 0;left: 0;right: 0;bottom: 0;background-color: rgba(0,0,0,0);z-index: 10">
           <div style="font-size:32px;text-align:center"> 📁 ：新业务模块文件夹 => contract ~ </div>
        </div>
        `
    }
}