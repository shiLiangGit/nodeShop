const {findUser} = require('../service/user.service');
const {userFormatError, userExited, registerFail, userNotExited, passwordError, pwdIsIdentical} = require('../validate/validateResult');
const bcrypt = require('bcryptjs');
const userValidate = async (ctx, next) => {
    const {user_name, password} = ctx.request.body;
    if (!user_name || !password) {
        console.log('用户名或密码不能为空', ctx.request.body);
        ctx.app.emit('error', userFormatError, ctx);
        return
    }
    await next(); // 必须写成同步形式
}
const userIsExited = async (ctx, next) => {
    const {user_name} = ctx.request.body;
    // 异常处理
    try {
        if (await findUser(user_name)) {
            console.error('用户名已存在', {user_name})
            ctx.app.emit('error', userExited, ctx);
            return;
        }
    } catch (e) {
        console.error('获取用户信息错误', {user_name})
        ctx.app.emit('error', registerFail, ctx);
    }
    await next(); // 必须写成同步形式
}
const verifyUser = async (ctx, next) => {
    const {user_name, password} = ctx.request.body;
    // 用户不存在
    try {
        let res = await findUser(user_name);
        if (!res) {
            console.error('用户不存在', {user_name})
            return ctx.app.emit('error', userNotExited, ctx);
        }

    } catch (err) {
        console.error('用户不存在', err)
        return ctx.app.emit('error', userNotExited, ctx);
    }
   await next();
}
const passwordErr = async (ctx, next) => {
    const {user_name, password} = ctx.request.body;
    let res = await findUser(user_name);
    console.log(bcrypt.compareSync(password, res.password))
    // 用户密码错误
    if (!bcrypt.compareSync(password, res.password)) {
        console.error('用户密码错误', {user_name});
        return ctx.app.emit('error', passwordError, ctx);
    }
    await next();
}
const somePassword = async (ctx, next) => {
    const {user_name, password} = ctx.request.body;
    let user = await findUser(user_name);
    // 用户密码错误
    if (bcrypt.compareSync(password, user.password)) {
        console.error('新旧密码不能相同', {user_name})
        return ctx.app.emit('error', pwdIsIdentical, ctx);
    }
    await next();
}
module.exports = {
    userValidate,
    verifyUser,
    userIsExited,
    passwordErr,
    somePassword
}