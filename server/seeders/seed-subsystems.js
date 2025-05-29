const SubSystem = require('../models/SubSystem');
const System = require('../models/System');
const connectDB = require('../config/db');

const seedSubSystems = async () => {
  await connectDB();
  await SubSystem.deleteMany();

  const systems = await System.find();
  const muscular = systems.find(s => s.name === "Musculoskeletal");
  const nervous = systems.find(s => s.name === "Nervous");

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
