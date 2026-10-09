const mongoose = require("mongoose");
const SystemModel = require('./SystemModel')

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true , trim: true,
    lowercase: true, }
}, { timestamps: true });


// 🚀 Middleware to cascade delete Systems, SubSystems, and Topics
subjectSchema.pre("findOneAndDelete", async function (next) {
  const subjectId = this.getQuery()._id;

  // 1. Find and delete systems linked to this subject
  const systems = await SystemModel.find({ subject: subjectId });

  for (const system of systems) {
    // Optional: delete subsystems and topics here too (see Step 2)
    await system.deleteOne(); // This triggers middleware on System model
  }

  next();
});

module.exports = mongoose.model("Subject", subjectSchema);
