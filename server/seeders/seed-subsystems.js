const SubSystem = require('../models/SubSystemModel');
const System = require('../models/SystemModel');
const connectDB = require('../config/db');

const seedSubSystems = async () => {
  await connectDB();
  await SubSystem.deleteMany();

  const systems = await System.find();

  const muscular = systems.find(s => s.name.toLowerCase() === "musculoskeletal");
  const nervous = systems.find(s => s.name.toLowerCase() === "nervous");

  if (!muscular || !nervous) {
    console.error("❌ Required systems not found:");
    if (!muscular) console.error("- Musculoskeletal system is missing.");
    if (!nervous) console.error("- Nervous system is missing.");
    throw new Error("Required systems (Musculoskeletal, Nervous) not found. Please seed systems first.");
  }

  const subSystems = [
    { name: "Skeletal Muscle", system: muscular._id },
    { name: "Bones", system: muscular._id },
    { name: "Central Nervous System", system: nervous._id },
    { name: "Peripheral Nervous System", system: nervous._id }
  ];

  const created = await SubSystem.insertMany(subSystems);
  console.log("✅ Seeded subsystems");
  return created;
};

module.exports = seedSubSystems;
