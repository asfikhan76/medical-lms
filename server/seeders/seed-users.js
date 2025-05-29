// server/seeders/seed-users.js
const connectDB = require('../config/db');
const bcrypt = require("bcrypt")
const User = require('../models/User'); // Make sure you have this model

const seedUsers = async () => {
  await connectDB();

  const users = [
    { username: 'admin', role: 'admin', password:  await bcrypt.hash("admin123", 10), },
    { username: 'Khalid', role: 'student', password: await bcrypt.hash("khalid123", 10) },
  ];

  await User.deleteMany(); // clean old users
  await User.insertMany(users);
  console.log('✅ User data seeded');
};

module.exports = seedUsers;
