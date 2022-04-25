const app = require("./app/index");
const {LISTENPORT} = require("./config/default");
app.listen(LISTENPORT, () => {
    console.log('koa 服务已启动');
})