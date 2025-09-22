// backend/data/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();
const User = require('../models/User');
const Product = require('../models/Product');

const products = [
  {
    name: 'Sample T-Shirt',
    description: 'Comfortable cotton T-shirt',
    price: 499,
    image: 'https://d2fy0k1bcbbnwr.cloudfront.net/Designs_Inners_and_Outers/Tshirts/Men/tshirt_hs_men_pat_d48_o.jpg',
    countInStock: 20
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight shoes for running',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    countInStock: 10
  },
  {
    name: 'Wireless Headphones',
    description: 'Over-ear Bluetooth headphones with noise isolation',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1518444028785-8f6f08ca4e00?w=800',
    countInStock: 25
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking, heart rate monitor, and notifications',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    countInStock: 15
  },
  {
    name: 'Backpack',
    description: 'Durable water-resistant backpack for work and travel',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1504280390368-3971c192b4d2?w=800',
    countInStock: 30
  },
  {
    name: 'Sunglasses',
    description: 'UV400 protection stylish sunglasses',
    price: 799,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
    countInStock: 40
  },
  {
    name: 'Gaming Mouse',
    description: 'Ergonomic mouse with customizable DPI',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1587202372775-98927b3ad6c9?w=800',
    countInStock: 22
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    countInStock: 18
  },
  {
    name: 'Portable Speaker',
    description: 'Waterproof Bluetooth speaker with deep bass',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800',
    countInStock: 35
  },
  {
    name: 'Laptop Stand',
    description: 'Aluminum adjustable stand for laptops',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
    countInStock: 28
  },
  {
    name: 'Phone Case',
    description: 'Shockproof case with slim profile',
    price: 399,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35c1?w=800',
    countInStock: 60
  },
  {
    name: 'USB-C Cable',
    description: '1m braided fast charging cable',
    price: 199,
    image: 'https://images.unsplash.com/photo-1585145197082-1ca6f8262b89?w=800',
    countInStock: 100
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle 750ml',
    price: 899,
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800',
    countInStock: 50
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=800',
    countInStock: 26
  },
  {
    name: 'Action Camera',
    description: '4K waterproof action camera with accessories',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1519183071298-a2962be96f83?w=800',
    countInStock: 12
  },
  {
    name: 'Tripod Stand',
    description: 'Lightweight tripod for cameras and phones',
    price: 999,
    image: 'https://images.unsplash.com/photo-1517445312885-9bf8ea1b9e44?w=800',
    countInStock: 34
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carry strap',
    price: 899,
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800',
    countInStock: 45
  },
  {
    name: 'Hoodie',
    description: 'Fleece-lined hoodie for all-day comfort',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    countInStock: 32
  },
  {
    name: 'Office Chair',
    description: 'Ergonomic chair with lumbar support',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800',
    countInStock: 14
  },
  {
    name: 'Table Clock',
    description: 'Minimalist analog desk clock',
    price: 699,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    countInStock: 38
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    await User.deleteMany({});
    await Product.deleteMany({});

    const hashed = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashed,
      isAdmin: true
    });

    console.log('Admin created:', admin.email);

    const createdProducts = await Product.insertMany(products);
    console.log('Products created:', createdProducts.length);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
