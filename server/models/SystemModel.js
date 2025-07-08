const mongoose = require("mongoose");
const SubSystemModel = require("./SubSystemModel")
const TopicModel = require("./TopicModel")

const systemSchema = new mongoose.Schema({
  name: { type: String, required: true , trim: true,
    lowercase: true, unique: true},
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }
}, { timestamps: true });




// 🧹 Middleware to delete related SubSystems and Topics when a System is deleted
systemSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const systemId = this._id;

  await SubSystemModel.deleteMany({ system: systemId });
  await TopicModel.deleteMany({ system: systemId });

  next();
});

module.exports = mongoose.model("System", systemSchema);
