const Goods = require('../model/goods.model');
class GoodsService {
    async addGoods(good) {
        let res = await Goods.create(good);
        return res.dataValues;
    }
    async updateGood(id, good) {
        let res = await Goods.update(good, {
            where: {id}
        });
        return res[0];
    }
    async deleteGood(id) {
        let res = await Goods.destroy({
            where: {id}
        });
        return !!res;
    }
    async restoreGood(id) {
        let res = await Goods.restore({
            where: {id}
        });

        return !!res;
    }
    async getGoods(pageIndex, pageSize) {
        // findAndCountAll 查询所有上架商品
        let offset = (pageIndex - 1) * pageSize
        let res = await Goods.findAndCountAll({
            offset,
            limit: pageSize
        });
        return res;
    }
}
module.exports = new GoodsService();