class GoodsController {
    uploadGoodsImg (ctx) {
        ctx.body = '图片上传成功';
    }
}
module.exports = new GoodsController();