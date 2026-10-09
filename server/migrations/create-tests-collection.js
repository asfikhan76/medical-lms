const mongoose = require('mongoose');
const connectDB = require('../config/db');
require('../models/Test'); // Ensures schema is registered

const createTestsCollection = async () => {
  await connectDB();

  // Wait until the connection is fully ready
  await new Promise((resolve) => {
    mongoose.connection.once('open', resolve);
  });

  const db = mongoose.connection.db;

  const collections = await db.listCollections({ name: 'Test' }).toArray();
  if (collections.length === 0) {
    await db.createCollection('Test');
    console.log("✅ 'Test' collection created");
  } else {
    console.log("ℹ️ 'Test' collection already exists");
  }

  await mongoose.disconnect();
};

module.exports = createTestsCollection;
