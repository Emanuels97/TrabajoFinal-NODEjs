const {Sequelize} = require('sequelize')
const BD = new Sequelize("cac-2024","root","fj123",{
    host: "localhost",
    dialect: "mysql",
    port: 3306
})

module.exports = BD;