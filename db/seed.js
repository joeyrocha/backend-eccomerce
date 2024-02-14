const { sequelize } = require('./conn');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../models/userModel');
const { Product } = require('../models/productModel');
const { Order } = require('../models/orderModel');


// seed the database
const seedDatabase = async () => {
  try {
    // clear the database
    await sequelize.sync({ force: true });

    // sync our models with db
    await User.sync();
    await Product.sync();
    await Order.sync();

    // create a user
    const user = await User.create({
      user_id: uuidv4(),
      first_name: 'John',
      last_name: 'Doe',
      address: '123 Main St, New York, NY 10030',
      email: 'joey@email.com',
    });

    // create some products
    const products = await Product.bulkCreate([
      { product_id: uuidv4(), product_name: 'Socks', description: 'Socks for men', price: 10 },
      { product_id: uuidv4(), product_name: 'T-Shirt', description: 'T-Shirt for women', price: 20 },
      { product_id: uuidv4(), product_name: 'Shoes', description: 'Shoes for men', price: 30 },
      { product_id: uuidv4(), product_name: 'Pants', description: 'Pants for women', price: 40 },
      { product_id: uuidv4(), product_name: 'Hat', description: 'Hat for men', price: 50 },
    ]);

    // // create some orders
    await Order.bulkCreate([
      { order_id: uuidv4(), user: user.user_id, product_ordered: products[0].product_id, total_paid: 10 },
      { order_id: uuidv4(), user: user.user_id, product_ordered: products[1].product_id, total_paid: 20 },
      { order_id: uuidv4(), user: user.user_id, product_ordered: products[2].product_id, total_paid: 30 },
      { order_id: uuidv4(), user: user.user_id, product_ordered: products[3].product_id, total_paid: 40 },
      { order_id: uuidv4(), user: user.user_id, product_ordered: products[4].product_id, total_paid: 50 },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.log(error);
  }
}

seedDatabase();