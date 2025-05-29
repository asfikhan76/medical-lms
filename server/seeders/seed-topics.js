const Topic = require('../models/Topic');
const SubSystem = require('../models/SubSystem');
const connectDB = require('../config/db');

const seedTopics = async () => {
  await connectDB();
  await Topic.deleteMany();

  const subsystems = await SubSystem.find();
  const muscle = subsystems.find(s => s.name === "Skeletal Muscle");
  const bones = subsystems.find(s => s.name === "Bones");

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
