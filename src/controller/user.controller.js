const {createUser} = require("../service/user.service");
class UserController {
    async register (ctx, next) {
        // 解析参数
        let {user_name, password} = ctx.request.body;
        ctx.body = await createUser(user_name, password);
    }
}

module.exports = new UserController();