const mongoose = require("mongoose");
const connectDB = require("../config/db");

const clearDatabase = async () => {
  try {
    await connectDB();

    const db = mongoose.connection.db; // get native MongoDB connection
    const collections = await db.listCollections().toArray();

    for (let collection of collections) {
      await db.collection(collection.name).deleteMany({});
      console.log(`✅ Cleared: ${collection.name}`);
    }

    console.log("✅ All collections cleared.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to clear DB:", err);
    process.exit(1);
  }
};

clearDatabase();
