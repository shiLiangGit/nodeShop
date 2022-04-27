/***
 *  bcrypt加密
 *  bcrypt.genSaltSync 加盐
 *  bcrypt.hashSync 加密
 * @type {*|{}}
 */
const bcrypt = require('bcryptjs');
module.exports = {
    async cryptPassword (ctx, next) {
        const {password} = ctx.request.body;
        console.log(password)
        try {
            const salt = bcrypt.genSaltSync(10);
            // hashSync 两个参数必须是字符串
            ctx.request.body.password = bcrypt.hashSync(password, salt);
            await next();
        } catch (err) {
            console.log(err)
        }
    }
}