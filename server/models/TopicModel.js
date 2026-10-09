const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true , trim: true,
    lowercase: true, unique: true},
  subSystem: { type: mongoose.Schema.Types.ObjectId, ref: "SubSystem", required: true }
}, { timestamps: true });


// 🧹 Optional: Middleware to log or clean up (not usually needed at Topic level)
topicSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  console.log("Deleting topic:", this._id);
  next();
});8

module.exports = mongoose.model("Topic", topicSchema);
