const {DataTypes} = require('sequelize');
const seq = require('../db/seq');
const Order = seq.define('shop_order', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '订单地址'
    },
    goods_info: {
        type:DataTypes.STRING,
        allowNull: false,
        comment: '商品信息'
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '订单总金额'
    },
    order_number: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '订单编号'
    },
    order_status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: '订单状态（0全部, 1 未付款， 2已发货、3已收货、4待评价、5已完成）'
    }
})
// Order.sync({force: true});
module.exports = Order;