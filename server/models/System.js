const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }
}, { timestamps: true });

module.exports = mongoose.model("System", systemSchema);
