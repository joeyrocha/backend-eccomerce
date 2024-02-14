const { Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(POSTGRES_URL);
require('dotenv').config();


class Order extends Model {}

Order.init({
  order_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'User', // This should be the name of the User model
      key: 'user_id'
    }
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Product', // This should be the name of the Product model
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
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Order;
