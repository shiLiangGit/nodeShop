const {findUser} = require('../service/user.service');
const {userFormatError, userExited, registerFail, userNotExited} = require('../validate/validateResult');
const userValidate = async (ctx, next) => {
    const {user_name, password} = ctx.request.body;
    if (!user_name || !password) {
        console.log('用户名或密码不能为空', ctx.request.body);
        ctx.app.emit('error', userFormatError, ctx);
        return
    }
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
const verifyUser = async () => {
    const {user_name, password} = ctx.request.body;
    try {
        if (!await findUser(user_name)) {
            console.error('用户不存在', {user_name})
            ctx.app.emit('error', userNotExited, ctx);
        }
    } catch (err) {
        console.error('获取用户信息不存在', err)
        ctx.app.emit('error', userNotExited, ctx);
    }
}
module.exports = {
    userValidate
}