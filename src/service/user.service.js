const User = require('../model/user.model');
class UserService {
    async createUser (user_name, password) {
        let params = {
            user_name,
            password
        }
        let res = await User.create(params); // 新增用户
        return res; // 表数据都在dataValues中返回
    }
    async findUser (user_name) {
        let res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: {user_name}
        });
        return res ? res.user_name : null;
    }
}

module.exports = new UserService();