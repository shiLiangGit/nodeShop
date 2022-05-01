const {DataTypes} = require('sequelize');
const seq = require('../db/seq');
const Cart = seq.define('shop_carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '商品数量'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        comment:'是否选中'
    }
})
// Cart.sync({force: true});
module.exports = Cart;