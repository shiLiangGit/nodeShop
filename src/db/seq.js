const {Sequelize} = require("sequelize");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = require('../config/default');
console.log(MYSQL_HOST)
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+8:00',
    dialectOptions: {
        useUTC: false
    }
})
seq.authenticate().then(() => {
    console.log('数据库连接成功');
}).catch((err)=> {
    console.log('数据库连接失败:', err);
})
module.exports = seq;