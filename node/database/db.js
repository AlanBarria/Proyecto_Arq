import { Sequelize } from "sequelize";

const db = new Sequelize('database_arq', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db