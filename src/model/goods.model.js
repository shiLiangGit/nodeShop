const {DataTypes} = require('sequelize');
const seq = require('../db/seq');
const Goods = seq.define('shop_goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品数量'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片'
    }
},{
    paranoid: true,
    deletedAt: "is_offline"
})
// Goods.sync({force: true});
module.exports = Goods;