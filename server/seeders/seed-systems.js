const System = require('../models/System');
const Subject = require('../models/Subject');
const connectDB = require('../config/db');

const seedSystems = async () => {
  await connectDB();
  await System.deleteMany();

  const subjects = await Subject.find();
  const anatomy = subjects.find(s => s.name === "Anatomy");
  const physiology = subjects.find(s => s.name === "Physiology");

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
