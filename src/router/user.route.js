const app = require("koa");
const Router = require("koa-router");
const router = new Router({prefix: '/users'});

const {register, login, changePassword} = require("../controller/user.controller");
const {
    userValidate,
    userIsExited,
    verifyUser,
    passwordErr,
    somePassword
} = require('../middleWare/user.middleWare'); // 用户校验中间件
const {cryptPassword} = require('../middleWare/crypt.middleWare');

router.post('/register', userValidate, userIsExited, cryptPassword, register); // 注册
router.post('/login', userValidate, verifyUser, passwordErr, login); // 登录
router.patch('/changePassword', userValidate, verifyUser,somePassword, cryptPassword, changePassword); // 登录

module.exports = router;