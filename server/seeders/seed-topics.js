const Topic = require('../models/TopicModel');
const SubSystem = require('../models/SubSystemModel');
const connectDB = require('../config/db');

const seedTopics = async () => {
  await connectDB();
  await Topic.deleteMany();

  const subsystems = await SubSystem.find();

  const muscle = subsystems.find(s => s.name.toLowerCase() === "skeletal muscle");
  const bones = subsystems.find(s => s.name.toLowerCase() === "bones");

  if (!muscle || !bones) {
    console.error("❌ Required subsystems not found:");
    if (!muscle) console.error("- Subsystem 'Skeletal Muscle' is missing.");
    if (!bones) console.error("- Subsystem 'Bones' is missing.");
    throw new Error("Required subsystems (Skeletal Muscle, Bones) not found. Please seed subsystems first.");
  }

  const topics = [
    { name: "Muscle Contraction", subSystem: muscle._id },
    { name: "Muscle Types", subSystem: muscle._id },
    { name: "Bone Structure", subSystem: bones._id },
    { name: "Bone Growth", subSystem: bones._id }
  ];

  await Topic.insertMany(topics);
  console.log("✅ Seeded topics");
};

module.exports = seedTopics;
