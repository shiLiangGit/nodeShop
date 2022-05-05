const {operateSuccess, operateFail} = require("../validate/validateResult");
const {addOrder, getOrder, updateOrderStatus} = require('../service/order.service');
const {validateParams} = require('../middleWare/params.middleWare');
class OrderController {
    async addOrder (ctx) {
        let {id: user_id} = ctx.userInfo;
        let {address, goods_info, total_price, order_status} = ctx.request.body;
        let order_number = 'albb' + new Date().getTime();
        let valParams = {
            address: 'string',
            goods_info: 'string',
            total_price: 'number',
            order_status: 'number'
        }
        if (!validateParams(ctx, valParams)) return;
        try {
            let {createdAt, updatedAt, ...res} = await addOrder({
                user_id,
                address,
                goods_info,
                total_price,
                order_number,
                order_status
            });
            if (res) {
                operateSuccess.message = '添加订单成功';
                operateSuccess.result = res;
                ctx.body = operateSuccess;
            } else {
                console.error('添加订单失败');
                operateFail.message = '添加订单失败';
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('添加订单失败', err);
            operateFail.message = '添加订单失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async getOrder (ctx) {
        let {id: user_id} = ctx.userInfo;
        let {pageIndex = 1, pageSize=10} = ctx.request.body;
        try {
            let {count, rows} = await getOrder({user_id, pageIndex, pageSize});
            if (count) {
                operateSuccess.message = '获取订单成功';
                operateSuccess.result = rows;
                ctx.body = operateSuccess;
            } else {
                console.error('获取订单失败');
                operateFail.message = '获取订单失败';
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('获取订单失败', err);
            operateFail.message = '获取订单失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async updateOrderStatus (ctx) {
        let {id, order_status} = ctx.request.body;
        if (!validateParams(ctx, {id: 'number', order_status: 'number'})) return;
        try {
            let res = await updateOrderStatus({id, order_status});
            if (res) {
                operateSuccess.message = '更新订单状态成功';
                operateSuccess.result = res;
                ctx.body = operateSuccess;
            } else {
                console.error('更新订单状态失败');
                operateFail.message = '更新订单状态失败';
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('更新订单状态失败', err);
            operateFail.message = '更新订单状态失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
}
module.exports = new OrderController();