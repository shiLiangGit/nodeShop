const dotenv = require('dotenv');
dotenv.config(); // 执行完会将.env的配置项加载到process.env对象中
module.exports = process.env;