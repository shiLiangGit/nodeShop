const Koa = require("koa");
const app = new Koa();
const KoaBody = require('koa-body');
const router = require("../router/user.route");

app.use(KoaBody()); // 解析接口参数数据
app.use(router.routes()); // 注册router
module.exports = app;