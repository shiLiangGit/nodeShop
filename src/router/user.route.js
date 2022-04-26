const app = require("koa");
const Router = require("koa-router");
const router = new Router({prefix: '/users'});

const {register, login} = require("../controller/user.controller");
const {userValidate} = require('../middleWare/user.middleWare'); // 用户校验中间件
const {cryptPassword} = require('../middleWare/crypt.middleWare');

router.post('/register', userValidate, cryptPassword, register); // 注册
router.post('/login', userValidate, cryptPassword, login); // 登录

module.exports = router;