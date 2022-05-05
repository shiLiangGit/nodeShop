const Order = require('../model/order.model');
class OrderService {
    async addOrder (params) {
        let res = await Order.create(params);
        return res.dataValues;
    }
    async getOrder ({user_id, pageIndex, pageSize}) {
        let offset = (pageIndex - 1) * pageSize;
        let res = await Order.findAndCountAll({
            attributes: ['id', 'user_id', 'address', 'goods_info', 'total_price', 'order_status'],
            offset,
            limit: pageSize,
            where: {
                user_id
            }
        });
        console.log(res)
        return res;
    }
    async updateOrderStatus ({id, order_status}) {
        let res = await Order.findByPk(id);
        res.order_status = order_status;
        return await res.save();
    }
}

module.exports = new OrderService();