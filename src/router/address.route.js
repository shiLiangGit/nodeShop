const Router = require('koa-router');
const router = new Router({prefix: '/address'});
const {verifyToken} = require('../middleWare/auth.middleWare');
const {addAddress, getAddressList, updateAddress, deleteAddress, setDefaultAddress} = require('../controller/address.controller.js');

router.post('/addAddress', verifyToken, addAddress); // 添加收货地址
router.get('/getAddressList', verifyToken, getAddressList); // 获取地址列表
router.put('/updateAddress/:id', verifyToken, updateAddress); // 更新地址信息
router.delete('/deleteAddress', verifyToken, deleteAddress); // 删除地址信息
router.post('/setDefaultAddress', verifyToken, setDefaultAddress); // 更新地址信息
module.exports = router;