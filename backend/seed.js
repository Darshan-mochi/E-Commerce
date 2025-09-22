const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const dummyProducts = [
  {
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation',
    price: 99.99,
    image: '/uploads/wireless-earbuds.jpg' ,
    countInStock: 50
  },
  {
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced camera features',
    price: 899.99,
    image: '/uploads/Smartphone X.jpg',
    countInStock: 30
  },
  {
    name: 'Laptop Pro',
    description: 'Powerful laptop for professionals',
    price: 1299.99,
    image: '/uploads/Laptop Pro.jpg',
    countInStock: 20
  },
  {
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected',
    price: 199.99,
    image: '/uploads/Smart Watch.jpg',
    countInStock: 45
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with 20-hour battery life',
    price: 79.99,
    image: '/uploads/Bluetooth Speaker.jpg',
    countInStock: 60
  },
  {
    name: '4K Smart TV',
    description: '55-inch 4K UHD Smart TV with HDR',
    price: 599.99,
    image: '/uploads/4K Smart TV.jpg',
    countInStock: 15
  },
  {
    name: 'Gaming Console',
    description: 'Next-gen gaming console with 1TB storage',
    price: 499.99,
    image: '/uploads/Gaming Console.jpg',
    countInStock: 25
  },
  {
    name: 'Wireless Headphones',
    description: 'Over-ear wireless headphones with ANC',
    price: 199.99,
    image: '/uploads/Wireless Headphones.jpg',
    countInStock: 35
  }
];

const dummyUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Hash passwords for users
    const users = await Promise.all(
      dummyUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    // Insert products
    const createdProducts = await Product.insertMany(dummyProducts);
    console.log(`${createdProducts.length} products created`);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
