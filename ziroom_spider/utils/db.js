const Sequelize = require('sequelize')
const define = require('./../config/define')

const mysql = define.db_config;

module.exports = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    define: {
        timestamps: false
    },
    logging: false
})