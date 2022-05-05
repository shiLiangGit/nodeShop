const Router = require('koa-router');
const router = new Router({prefix: '/order'});
const {verifyToken} = require('../middleWare/auth.middleWare');
const {addOrder, getOrder, updateOrderStatus} = require('../controller/order.controller');
router.post('/addOrder', verifyToken, addOrder); // 点击订单
router.get('/getOrder', verifyToken, getOrder); // 获取订单列表
router.patch('/updateOrderStatus', verifyToken, updateOrderStatus); // 更新订单状态
module.exports = router;