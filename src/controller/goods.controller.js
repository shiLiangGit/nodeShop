const { operateSuccess, operateFail } = require('../validate/validateResult');
const {addGoods, updateGood, deleteGood, restoreGood, getGoods} = require('../service/goods.service');
const {validateParams} = require('../middleWare/params.middleWare');
class GoodsController {
    uploadGoodsImg (ctx) {
        let file = ctx.request.files.file;
        let allowFiles = ['image/jpeg', 'image/png', 'image/jpg'];
        if (file) {
            // 图片类型校验
            if (!allowFiles.includes(file.mimetype)) {
                operateFail.message = '不支持的图片类型';
                return ctx.app.emit('error', operateFail, ctx);
            }
            operateSuccess.message = '商品图片上传成功';
            operateSuccess.result = {
                good_pic: file.newFilename
            }
            ctx.body = operateSuccess;
        } else {
            operateFail.message = '商品图片不能为空';
            console.error('商品图片不能为空')
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async publishGood (ctx) {
        let {goods_name, goods_price, goods_num, goods_img} = ctx.request.body;
        let valParams = {
            goods_name: {type: 'string', required: true},
            goods_price: {type: 'number', required: true},
            goods_num: {type: 'number', required: true},
            goods_img: {type: 'string', required: true}
        }
        if (validateParams(ctx, valParams)) {
            let res = null, params = null;
            try {
                params = {goods_name, goods_price, goods_num, goods_img};
                res = await addGoods(params);
                operateSuccess.message = '商品发布成功';
                operateSuccess.result = res
                ctx.body = operateSuccess;
            } catch (e) {
                operateFail.message = '商品发布失败';
                console.error('商品发布失败', e)
                return ctx.app.emit('error', operateFail, ctx);
            }
        }
    }
    async editGood (ctx) {
        try {
            let {goods_name, goods_price, goods_num, goods_img} = ctx.request.body;
            let id = ctx.params.id;
            let params = {goods_name, goods_price, goods_num, goods_img}
            let res = await updateGood(id, params);
            if (res) {
                operateSuccess.message = '商品修改成功';
                ctx.body = operateSuccess;
            } else {
                operateFail.message = '修改的商品不存在';
                ctx.body = operateFail;
                return ctx.app.emit('error', operateFail, ctx);
            }
        } catch (err) {
            operateFail.message = '商品修改失败';
            console.error('商品修改失败', err)
            return ctx.app.emit('error', operateFail, ctx);
        }
    }
    async deleteGood (ctx) {
        try {
            let id = ctx.params.id;
            let res = await deleteGood(id);
            console.log(res)
            if (res) {
                operateSuccess.message = '商品已下架';
                ctx.body = operateSuccess;
            } else {
                operateFail.message = '商品下架失败';
                ctx.body = operateFail;
                return ctx.app.emit('error', operateFail, ctx);
            }
        } catch (err) {
            operateFail.message = '商品下架失败';
            console.error('商品下架失败', err)
            ctx.body = operateFail;
            return ctx.app.emit('error', operateFail, ctx);
        }
    }
    async restoreGood (ctx) {
        try {
            let id = ctx.params.id;
            let res = await restoreGood(id);
            if (res) {
                operateSuccess.message = '商品上架成功';
                ctx.body = operateSuccess;
            } else {
                operateFail.message = '商品上架失败';
                ctx.body = operateFail;
                return ctx.app.emit('error', operateFail, ctx);
            }
        } catch (err) {
            console.error('商品上架失败', err)
            operateFail.message = '商品上架失败';
            ctx.body = operateFail;
            return ctx.app.emit('error', operateFail, ctx);
        }
    }
    async goodsList (ctx) {
        try {
            let {pageIndex = 1, pageSize = 10} = ctx.params;
            let res = await getGoods(pageIndex, pageSize);
            console.log(res)
            if (res) {
                operateSuccess.message = '获取商品列表成功';
                operateSuccess.result = {
                    pageIndex,
                    pageSize,
                    count: res.count,
                    lists: res.rows
                }
                ctx.body = operateSuccess;
            }
        } catch (err) {
            console.error('获取商品列表失败', err)
            operateFail.message = '获取商品列表失败';
            ctx.body = operateFail;
            return ctx.app.emit('error', operateFail, ctx);
        }
    }
}
module.exports = new GoodsController();