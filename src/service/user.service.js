const User = require('../model/user.model');
class UserService {
    // 创建用户
    async createUser (user_name, password) {
        let params = {
            user_name,
            password
        }
        let res = await User.create(params); // 新增用户
        return res; // 表数据都在dataValues中返回
    }
    // 查找用户
    async findUser (user_name) {
        let res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: {user_name}
        });
        return res ? res : null;
    }
    // 更新密码
    async updatePassword ({user_name, password}) {
        let res = await User.update({password}, {
            where: {user_name}
        });
        return res[0] > 0;
    }
}

module.exports = new UserService();