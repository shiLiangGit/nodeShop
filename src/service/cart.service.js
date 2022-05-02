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
    async changeCartGoods ({cartId, number, selected}) {
        let res = await Cart.findByPk(cartId);
        if (!res) return;
        number && (res.number = number);
        selected !== undefined && (res.selected = selected);
        return await res.save();
    }
    async deleteCartGoods ({ids}) {
        let res = await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        })
        return res;
    }
    async selectedOrUnselected (user_id, selected) {
        let res = await Cart.update({
            selected
        }, {
            where: {
                user_id
            }
        })
        return res[0] > 0;
    }
}

module.exports = new CartService();