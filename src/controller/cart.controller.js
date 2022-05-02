const {validateParams} = require('../middleWare/params.middleWare');
const {findGood, addGood, getCartGoods, changeCartGoods, deleteCartGoods, selectedOrUnselected} = require('../service/cart.service');
const {operateSuccess, operateFail} = require('../validate/validateResult');
class CartController {
    async addCart (ctx) {
        try {
            let user_id = ctx.userInfo.id;
            let {goods_id, number} = ctx.request.body;
            let valParams = {
                goods_id: 'number',
                number: 'number'
            }
            // 参数校验
            if (validateParams(ctx, valParams)) return;
            let res = await findGood({user_id, goods_id});
            let r = null;
            if (res) {
                await res.increment('number', {by: number})
                r = await res.reload();
            } else {
                r = await addGood({user_id, goods_id, number});
            }
            operateSuccess.message = '添加购物车成功';
            operateSuccess.result = {
                goods_id: r.goods_id,
                user_id: r.user_id,
                number: r.number
            }
            ctx.body = operateSuccess;
        } catch (err) {
            console.log('添加购物车失败', err);
            operateFail.message = '添加购物车失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async getCartGoods (ctx) {
       try {
           let {pageIndex = 1, pageSize = 10} = ctx.params;
           let {count, rows} = await getCartGoods(pageIndex, pageSize);
           if (count) {
               operateSuccess.message = '获取购物车商品成功';
               operateSuccess.result = {
                   pageIndex,
                   pageSize,
                   count,
                   list: rows
               }
               ctx.body = operateSuccess;
           } else {
               console.log('购物车暂无内容');
               operateFail.message = '购物车暂无内容';
               ctx.app.emit('error', operateFail, ctx);
           }
       } catch (err) {
           console.error('获取购物车商品失败', err);
           operateFail.message = '获取购物车商品失败';
           ctx.app.emit('error', operateFail, ctx);
       }
    }
    async changeCartGoods (ctx) {
        let valParams = {
            number: {type: 'number', required: false},
            selected: {type: 'bool', required: false}
        }
        // 参数校验
        if (!validateParams(ctx, valParams)) return;
        try {
            let cartId = ctx.params.id;
            let {number, selected} = ctx.request.body;
            console.log('eee', selected)
            if (!number && !selected) {
                console.error('商品数量和是否选中不能同时为空');
                operateFail.message = '商品数量和是否选中不能同时为空';
                return ctx.body = operateFail;
            }
            let res = await changeCartGoods({cartId, number, selected});
            if (res) {
                operateSuccess.message = '更新购物车成功';
                operateSuccess.result = res;
                ctx.body = operateSuccess;
            } else {
                operateFail.message = '更新购物车失败';
                console.error('更新购物车失败');
                ctx.app.emit('error', operateFail, ctx);
            }
        } catch (err) {
            operateFail.message = '更新购物车失败';
            console.error('更新购物车失败', err);
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async deleteCartGoods (ctx) {
        try {
            let {ids} = ctx.request.body;
            if (!validateParams(ctx, {ids: 'array'})) return;
            let res = await deleteCartGoods({ids});
            if (res) {
                operateSuccess.message = '购物车商品已删除';
                ctx.body = operateSuccess;
            } else {
                console.log('购物车商品删除失败', res);
                operateFail.message = '购物车商品删除失败';
                ctx.app.emit('error', operateFail, ctx);
            }
        } catch (err) {
            console.error('购物车商品删除失败', err);
            operateFail.message = '购物车商品删除失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async selectedOrUnselected (ctx) {
        let {id:user_id} = ctx.userInfo; // 全选/不选 用户下的所有购物车商品
        let {status} = ctx.request.body;
        let tip = status ? '购物车商品已全选' : '购物车商品已取消全选';
        let errTip = status ? '购物车商品全选失败' : '购物车商品取消全选失败';
        if (!validateParams(ctx, {status: 'bool'})) return;
        try {
            let res = await selectedOrUnselected(user_id, status);
            if (res) {
                operateSuccess.message = tip;
                ctx.body = operateSuccess;
            } else {
                console.log(errTip, res);
                operateFail.message = errTip;
                ctx.app.emit('error', operateFail, ctx);
            }
        } catch (err) {
            console.error(errTip, err);
            operateFail.message = errTip;
            ctx.app.emit('error', operateFail, ctx);
        }
    }
}

module.exports = new CartController();