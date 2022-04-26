const {createUser} = require("../service/user.service");
const {operateSuccess, registerFail} = require('../validate/validateResult');
class UserController {
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
    async login (ctx, next) {
        let {user_name, password} = ctx.request.body;
        try {
            operateSuccess.message = '登录成功';
            ctx.body = operateSuccess;
        } catch (err) {
            ctx.app.emit('error', );
        }
    }
}

module.exports = new UserController();