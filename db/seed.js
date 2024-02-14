const { sequelize } = require('./conn');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../models/userModel');
const { Product } = require('../models/productModel');
const { Order } = require('../models/orderModel');
const { OrderItem } = require('../models/orderItemModel'); // Ensure this model is properly defined

const seedDatabase = async () => {
  try {
    // clear the database
    await sequelize.sync({ force: true });

    // create a user
    const user = await User.create({
      user_id: uuidv4(),
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Main St, New York, NY 10030',
      email: 'john@email.com',
    });

    // create some products
    const products = await Product.bulkCreate([
      { product_id: uuidv4(), product_name: 'Socks', description: 'Cozy cotton socks', price: 10 },
      { product_id: uuidv4(), product_name: 'T-Shirt', description: 'Cotton t-shirt', price: 20 },
      { product_id: uuidv4(), product_name: 'Shoes', description: 'Running shoes', price: 30 },
      { product_id: uuidv4(), product_name: 'Pants', description: 'Jeans', price: 40 },
      { product_id: uuidv4(), product_name: 'Hat', description: 'Baseball cap', price: 50 },
    ]);

    // create a single order for the user
    const order = await Order.create({
      order_id: uuidv4(),
      user: user.user_id,
      total_paid: 10 * 2 + 20 * 3 + 30 + 40 + 50, // Example calculation, adjust as needed
    });

    // associate the order with multiple products with varying quantities
    await OrderItem.bulkCreate([
      { orderItemId: uuidv4(), orderId: order.order_id, productId: products[0].product_id, quantity: 2 }, // 2 socks
      { orderItemId: uuidv4(), orderId: order.order_id, productId: products[1].product_id, quantity: 3 }, // 3 T-Shirts
      { orderItemId: uuidv4(), orderId: order.order_id, productId: products[2].product_id, quantity: 1 }, // 1 pair of Shoes
      { orderItemId: uuidv4(), orderId: order.order_id, productId: products[3].product_id, quantity: 1 }, // 1 pair of Pants
      { orderItemId: uuidv4(), orderId: order.order_id, productId: products[4].product_id, quantity: 1 }, // 1 Hat
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
