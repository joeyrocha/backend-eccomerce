const { sequelize } = require('../db/conn');
const { DataTypes } = require('sequelize');
const { Order } = require('./orderModel');
const { Product } = require('./productModel');

const OrderItem = sequelize.define('orderItem', {
    // Primary key for the orderItem
    orderItemId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    // ForeignKey to Order
    orderId: {
        type: DataTypes.UUID,
        references: {
            model: 'Order',
            key: 'order_id'
        }
    },
    // ForeignKey to Product
    productId: {
        type: DataTypes.UUID,
        references: {
            model: 'Product',
            key: 'product_id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    // You can add more fields here as needed
}, {
    // Additional model options
    sequelize,
    modelName: 'OrderItem',
    tableName: 'orderItems',
    timestamps: false
});

// Order-Product relationship
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId' });

// Optional: If you need direct access from Order to OrderItems or vice versa
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    OrderItem
}