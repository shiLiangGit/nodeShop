const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/default");
const {tokenError, noAdminPermission} = require("../validate/validateResult");
const verifyToken = async (ctx, next) => {
    let {authorization} = ctx.request.header;
    let token = authorization.replace('Bearer ', '');
    try {
        // user 包含生成token时中payload的信息
        let user = jwt.verify(token, JWT_SECRET);
        ctx.userInfo = user;
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token过期', err.name);
                tokenError.message = 'token过期';
                return ctx.app.emit('error', tokenError, ctx);
            case 'JsonWebTokenError':
                console.error('无效的token', err.name);
                tokenError.message = '无效的token';
                return ctx.app.emit('error', tokenError, ctx);
            case 'NotBeforeError':
                console.error('服务器时间晚于token生成日期', err.name);
                tokenError.message = '服务器时间晚于token生成日期';
                return ctx.app.emit('error', tokenError, ctx);
            default:
                break;
        }
    }
    await next();
}
const adminValidate = async (ctx, next) => {
    let is_admin = ctx.userInfo.is_admin;
    console.log(ctx.userInfo)
    if (!is_admin) {
        console.error('该用户没有管理员权限');
        return ctx.app.emit('error', noAdminPermission, ctx);
    }
    await next();
}
module.exports = {
    verifyToken,
    adminValidate
}