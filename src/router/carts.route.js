const Router = require('koa-router');
const router = new Router({prefix: '/carts'});
const {verifyToken} = require('../middleWare/auth.middleWare');
const {addCart} = require('../controller/cart.controller.js')
router.post('/addCart', verifyToken, addCart);

module.exports = router;