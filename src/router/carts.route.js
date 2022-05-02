const Router = require('koa-router');
const router = new Router({prefix: '/carts'});
const {verifyToken} = require('../middleWare/auth.middleWare');
const {addCart, getCartGoods, changeCartGoods, deleteCartGoods, selectedOrUnselected} = require('../controller/cart.controller.js')
router.post('/addCart', verifyToken, addCart); // 添加购物车
router.get('/getCartGoods', verifyToken, getCartGoods); // 获取购物车商品列表
router.patch('/changeCartGoods/:id', verifyToken, changeCartGoods); // 修改购物车商品数量、选中状态
router.delete('/deleteCartGoods', verifyToken, deleteCartGoods); // 批量删除购物车商品
router.post('/selectedOrUnselected', verifyToken, selectedOrUnselected); // 全选或全不选购物车商品


module.exports = router;