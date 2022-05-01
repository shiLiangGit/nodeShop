const {validateParams} = require('../middleWare/params.middleWare');
const {findGood, addGood} = require('../service/cart.service');
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
            if (validateParams(ctx, valParams)) {
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
            }
        } catch (err) {
            console.log('添加购物车失败', err);
            operateFail.message = '添加购物车失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
}

module.exports = new CartController();