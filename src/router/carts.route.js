const Router = require('koa-router');
const router = new Router({prefix: '/carts'});
const {verifyToken} = require('../middleWare/auth.middleWare');
const {addCart, getCartGoods} = require('../controller/cart.controller.js')
router.post('/addCart', verifyToken, addCart); // 添加购物车
router.get('/getCartGoods', verifyToken, getCartGoods); // 获取购物车商品列表


module.exports = router;