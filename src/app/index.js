const Koa = require("koa");
const app = new Koa();
const path = require('path');
const KoaBody = require('koa-body');
const KoaStatic = require('koa-static');
const KoaParameter = require('koa-parameter');

const router = require("../router");
const errHandle = require('../app/errHandle');
console.log('cwd', process.cwd()) // nodeShop目录
app.use(KoaBody({
    // 文件上传配置
    multipart: true,
    formidable: {
        // uploadDir 尽量使用绝对路径， 因为相对路径是相对于process.cwd()路径的
        // __dirname 是当前文件所在目录，即app目录
        uploadDir: path.join(__dirname, '../upload'),
        keepExtensions: true
    },
    parsedMethods: ['POST', 'PATCH', 'PUT', 'DELETE'] // 配置ctx.request.body 支持 delete请求参数挂载body对象上
})); // 解析接口参数数据
app.use(KoaStatic(path.join(__dirname, '../upload'))); // 配置静态资源目录
app.use(router.routes()).use(router.allowedMethods()); // 注册router
KoaParameter(app);
app.on('error', errHandle);
module.exports = app;