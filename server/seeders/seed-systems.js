const System = require('../models/SystemModel');
const Subject = require('../models/SubjectModel');
const connectDB = require('../config/db');

const seedSystems = async () => {
  await connectDB();
  await System.deleteMany();

  const subjects = await Subject.find();

  const anatomy = subjects.find(s => s.name.toLowerCase() === "anatomy");
  const physiology = subjects.find(s => s.name.toLowerCase() === "physiology");

  if (!anatomy || !physiology) {
    console.error("❌ Required subjects not found:");
    if (!anatomy) console.error("- Anatomy subject is missing.");
    if (!physiology) console.error("- Physiology subject is missing.");
    throw new Error("Required subjects (Anatomy, Physiology) not found. Please seed subjects first.");
  }

  const systems = [
    { name: "Musculoskeletal", subject: anatomy._id },
    { name: "Nervous", subject: anatomy._id },
    { name: "Cardiovascular", subject: physiology._id }
  ];

  const created = await System.insertMany(systems);
  console.log("✅ Seeded systems");
  return created;
};

module.exports = seedSystems;
