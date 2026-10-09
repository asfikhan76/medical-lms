// server/seeders/seed-users.js
const connectDB = require('../config/db');
const bcrypt = require("bcrypt")
const User = require('../models/UserModel'); // Make sure you have this model

const seedUsers = async () => {
  await connectDB();

  const users = [
    { username: 'admin', role:'admin',email: "admin@gmail.com", password:  await bcrypt.hash("admin123", 10), },
    { username: 'Khalid', role: 'student',email: "student@gmail.com", password: await bcrypt.hash("khalid123", 10) },
  ];

  await User.deleteMany(); // clean old users
  await User.insertMany(users);
  console.log('✅ User data seeded');
};

module.exports = seedUsers;
