const {operateSuccess, operateFail} = require('../validate/validateResult');
const {addAddress, getAddressList, updateAddress, deleteAddress, setDefaultAddress} = require('../service/address.service.js');
const {validateParams} = require("../middleWare/params.middleWare");
class AddressController {
    async addAddress (ctx) {
        try {
            let {id: user_id} = ctx.userInfo;
            let {consignee, phone, address} = ctx.request.body;
            let valParams = {
                consignee: 'string',
                phone: {type: 'string', format: /^1\d{10}/},
                address: 'string'
            }
            if (!validateParams(ctx, valParams)) return;
            let res = await addAddress({user_id, consignee, phone, address});
            if (res) {
                operateSuccess.message = '添加购物车成功';
                operateSuccess.result = res;
                ctx.body = operateSuccess;
            } else {
                console.error('添加购物车失败');
                operateFail.message = '添加购物车失败';
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('添加购物车失败', err);
            operateFail.message = '添加购物车失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async getAddressList (ctx) {
        let {id: user_id} = ctx.userInfo;
        let {pageIndex = 1, pageSize = 10} = ctx.request.body;
        try {
            let {count, rows} = await getAddressList({user_id, pageIndex, pageSize});
            if (count) {
                operateSuccess.message = '获取购物车列表成功';
                operateSuccess.result = {
                    pageIndex,
                    pageSize,
                    count,
                    list: rows
                };
                ctx.body = operateSuccess;
            } else {
                console.error('购物车列表为空');
                operateFail.message = '购物车列表为空';
                operateFail.result = {
                    pageIndex,
                    pageSize,
                    count,
                    list: rows
                }
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('获取购物车列表失败', err);
            operateFail.message = '获取购物车列表失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async updateAddress (ctx) {
        let {id} = ctx.params;
        let {address} = ctx.request.body;
        try {
            let res = await updateAddress({id, address});
            if (res) {
                operateSuccess.message = '更新收货地址成功';
                operateSuccess.result = res;
                ctx.body = operateSuccess;
            } else {
                console.error('更新收货地址失败');
                operateFail.message = '更新收货地址失败';
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('更新收货地址失败');
            operateFail.message = '更新收货地址失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async deleteAddress (ctx) {
        let {id} = ctx.request.body;
        try {
            let res = await deleteAddress(id);
            console.log(res)
            if (res) {
                operateSuccess.message = '收货地址删除成功';
                ctx.body = operateSuccess;
            } else {
                console.error('收货地址删除失败');
                operateFail.message = '收货地址删除失败';
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('收货地址删除失败');
            operateFail.message = '收货地址删除失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
    async setDefaultAddress (ctx) {
        let {id, is_default} = ctx.request.body;
        if (!validateParams(ctx, {id: 'number', is_default: 'bool'})) return;
        try {
            let res = await setDefaultAddress({id, is_default});
            if (res) {
                operateSuccess.message = '设置默认地址成功';
                ctx.body = operateSuccess;
            } else {
                console.error('设置默认地址失败');
                operateFail.message = '设置默认地址失败';
                ctx.body = operateFail;
            }
        } catch (err) {
            console.error('设置默认地址失败');
            operateFail.message = '设置默认地址失败';
            ctx.app.emit('error', operateFail, ctx);
        }
    }
}
module.exports = new AddressController();