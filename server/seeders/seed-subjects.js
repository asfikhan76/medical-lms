const Subject = require('../models/SubjectModel');
const connectDB = require('../config/db');

const seedSubjects = async () => {
  await connectDB();
  await Subject.deleteMany();

  const subjects = [
    { name: "Anatomy" },
    { name: "Physiology" },
    { name: "Biochemistry" }
  ];

  const created = await Subject.insertMany(subjects);
  console.log("✅ Seeded subjects");
  return created; // Return to use for references
};

module.exports = seedSubjects;
