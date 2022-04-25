const app = require("koa");
const Router = require("koa-router");
const router = new Router({prefix: '/user'});

const {register} = require("../controller/user.controller");

router.get('/register', register);

module.exports = router;