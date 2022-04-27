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
const {verifyToken} = require('../middleWare/auth.middleWare');    // token鉴权中间件
const {cryptPassword} = require('../middleWare/crypt.middleWare'); // 加密中间件

router.post('/register', userValidate, userIsExited, cryptPassword, register); // 注册
router.post('/login', userValidate, verifyUser, passwordErr, login); // 登录
router.patch('/changePassword', userValidate, verifyUser,somePassword, cryptPassword, verifyToken, changePassword); // 登录

module.exports = router;