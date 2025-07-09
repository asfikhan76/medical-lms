const mongoose = require("mongoose");
const TopicModel = require("./TopicModel");

const subSystemSchema = new mongoose.Schema({
  name: { type: String, required: true , trim: true,
    lowercase: true, unique: true},
  system: { type: mongoose.Schema.Types.ObjectId, ref: "System", required: true }
}, { timestamps: true });

module.exports = mongoose.model("SubSystem", subSystemSchema);


subSystemSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const subSystemId = this._id;
  await TopicModel.deleteMany({ subSystem: subSystemId });
  next();
});
