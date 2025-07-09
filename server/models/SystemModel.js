const mongoose = require("mongoose");
const SubSystemModel = require("./SubSystemModel")
const TopicModel = require("./TopicModel")

const systemSchema = new mongoose.Schema({
  name: { type: String, required: true , trim: true,
    lowercase: true, unique: true},
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }
}, { timestamps: true });




systemSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
  const systemId = this._id;

  // Delete all subSystems of this system
  const subSystems = await SubSystemModel.find({ system: systemId });

  // Delete all topics under those subSystems
  const subSystemIds = subSystems.map(sub => sub._id);
  await TopicModel.deleteMany({ subSystem: { $in: subSystemIds } });

  // Now delete the subSystems
  await SubSystemModel.deleteMany({ system: systemId });

  next();
});

module.exports = mongoose.model("System", systemSchema);