const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subSystem: { type: mongoose.Schema.Types.ObjectId, ref: "SubSystem", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Topic", topicSchema);
