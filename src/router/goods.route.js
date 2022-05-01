const Router = require('koa-router');
const router = new Router({prefix: '/goods'});
const {uploadGoodsImg, publishGood, editGood, deleteGood, restoreGood, goodsList} =require('../controller/goods.controller');
const {verifyToken, adminValidate} = require("../middleWare/auth.middleWare");
router.post('/uploadGoodsImg', verifyToken, adminValidate, uploadGoodsImg); // 上传商品图片
router.post('/publishGood', verifyToken, adminValidate, publishGood); // 发布商品
router.put('/editGood/:id', verifyToken, adminValidate, editGood); // 修改商品
router.post('/deleteGood/:id', verifyToken, adminValidate, deleteGood); // 下架商品
router.post('/restoreGood/:id', verifyToken, adminValidate, restoreGood); // 上架商品
router.get('/goodsList', goodsList); // 获取商品列表
module.exports = router;