import { Sequelize } from "sequelize";

const db = new Sequelize('database_arq', 'roor', '',{
    host: 'localhost',
    dialect: 'mysql'
})

export default db