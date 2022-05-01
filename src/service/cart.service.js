const Cart = require('../model/carts.model');
const {Op} = require("sequelize");
const Goods = require("../model/goods.model");
class CartService {
    async findGood ({user_id, goods_id}) {
        let res = await Cart.findOne({
            where: {
                [Op.and]:{
                    user_id,
                    goods_id
                }
            }
        });
        return res;
    }
    async addGood ({user_id, goods_id, number}) {
        let res = await Cart.create({
            user_id,
            goods_id,
            number
        });
        return res.dataValues;
    }
    async getCartGoods (pageIndex, pageSize) {
        let offset = (pageIndex - 1) * pageSize;
        let res = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'],
            offset,
            limit: pageSize,
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
                where: {
                    is_offline: {
                        [Op.is]: null
                    }
                }
            }
        });
        return res;
    }
}

module.exports = new CartService();