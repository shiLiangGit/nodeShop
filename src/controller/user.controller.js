const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {createUser} = require("../service/user.service");
const {operateSuccess, registerFail, loginError, changePwdErr, pwdIsIdentical} = require('../validate/validateResult');
const {findUser, updatePassword} = require('../service/user.service');
const {JWT_SECRET} = require('../config/default');
class UserController {
    // 注册
    async register (ctx) {
        // 解析参数
        let {user_name, password, is_admin} = ctx.request.body;
        let res = null;
        try {
            res = await createUser(user_name, password, is_admin);
            // 重置返回信息
            operateSuccess.message = '用户注册成功';
            operateSuccess.result = {
                id: res.id,
                user_name: res.user_name,
                is_admin: res.is_admin
            }
            ctx.body = operateSuccess;
        } catch (err) {
            console.error('用户注册错误', err)
            ctx.app.emit('error', registerFail, ctx);
        }
    }
    // 登录
    async login (ctx) {
        let {user_name} = ctx.request.body;
        try {
            let {password, ...res} = await findUser(user_name);
            operateSuccess.message = '登录成功';
            operateSuccess.result = {
                token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'}) // expiresIn token过期时间
            };
            ctx.body = operateSuccess;
        } catch (err) {
            console.error('登录错误', err);
            ctx.app.emit('error', loginError, ctx);
        }
    }
    // 修改密码
    async changePassword (ctx) {
        let {user_name, password} = ctx.request.body;
        try {
            let res = await updatePassword({user_name, password});
            if (res) {
                operateSuccess.message = '密码修改成功';
                ctx.body = operateSuccess;
            } else {
                ctx.app.emit('error', changePwdErr, ctx);
                ctx.body = changePwdErr;
            }
        } catch (err) {
            console.log('密码修改失败', err)
            ctx.app.emit('error', changePwdErr, ctx);
        }
    }
}

module.exports = new UserController();