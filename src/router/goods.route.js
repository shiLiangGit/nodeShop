const Router = require('koa-router');
const router = new Router({prefix: '/goods'});
const {uploadGoodsImg} =require('../controller/goods.controller');
router.post('/uploadGoodsImg', uploadGoodsImg);
module.exports = router;