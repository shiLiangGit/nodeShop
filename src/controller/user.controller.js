const jwt = require('jsonwebtoken');
const {createUser} = require("../service/user.service");
const {operateSuccess, registerFail, loginError} = require('../validate/validateResult');
const {findUser} = require('../service/user.service');
const {JWT_SECRET} = require('../config/default');
class UserController {
    // 注册
    async register (ctx, next) {
        // 解析参数
        let {user_name, password} = ctx.request.body;
        let res = null;
        try {
            res = await createUser(user_name, password);
            // 重置返回信息
            operateSuccess.message = '用户注册成功';
            operateSuccess.result = {
                id: res.id,
                user_name: res.user_name
            }
            ctx.body = operateSuccess;
        } catch (err) {
            console.error('用户注册错误', {
                id: res.id,
                user_name: res.user_name
            })
            ctx.app.emit('error', registerFail, ctx);
        }
    }
    // 登录
    async login (ctx, next) {
        let {user_name} = ctx.request.body;
        try {
            let {password, ...res} = findUser(user_name);
            operateSuccess.message = '登录成功';
            // expiresIn token过期时间
            operateSuccess.result.token = jwt.sign(res, JWT_SECRET, {expiresIn: 60});
            ctx.body = operateSuccess;
        } catch (err) {
            console.error('登录错误', err);
            ctx.app.emit('error', loginError, ctx);
        }
    }
}

module.exports = new UserController();