const Address = require('../model/address.model');
class AddressService {
    async addAddress (params) {
        let res = await Address.create(params);
        return res.dataValues;
    }
    async getAddressList ({user_id, pageIndex, pageSize}) {
        let offset = (pageIndex - 1) * pageSize;
        let res = await Address.findAndCountAll({
            offset,
            limit: pageSize,
            where: {
                user_id
            }
        });
        return res;
    }
    async updateAddress ({id, address}) {
        let res = await Address.findByPk(id);
        res.address = address;
        return await res.save();
    }
    async deleteAddress (id) {
        let res = await Address.destroy({
            where: {
                id
            }
        });
        return res;
    }
    async setDefaultAddress ({id, is_default}) {
        let res = await Address.update({
            is_default
        },{
            where: {
                id
            }
        });
        console.log(res)
        return res[0] > 0;
    }
}
module.exports = new AddressService();