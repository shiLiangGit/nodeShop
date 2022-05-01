const Cart = require('../model/carts.model');
const {Op} = require("sequelize");
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
    async updateGood ({user_id, goods_id, number}) {
        let res = await Cart.update({
            number
        },{
            where: {
                user_id,
                goods_id,
            }
        });
        return res[0] > 0;
    }
}

module.exports = new CartService();