const { Sequelize } = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.POSTGRES_URL) // Example for postgres

//TEST CONNECTION
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    testConnection,
    sequelize
}