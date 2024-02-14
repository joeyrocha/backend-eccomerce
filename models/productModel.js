const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');

// define our models
const Product = sequelize.define('product', {
    product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
});

module.exports = {
    Product
}
