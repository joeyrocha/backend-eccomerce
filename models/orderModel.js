const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');
const { User } = require('./userModel');
const { Product } = require('./productModel');

// define the sequelize model
const Order = sequelize.define('order', {
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    user: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    product_ordered: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
    },
    total_paid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false
});

// Associations
User.hasMany(Order, { foreignKey: 'user' });
Order.belongsTo(User, { foreignKey: 'user' });

Product.hasMany(Order, { foreignKey: 'product_ordered' });
Order.belongsTo(Product, { foreignKey: 'product_ordered' });

module.exports = {
    Order
}