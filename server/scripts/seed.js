const mongoose = require('mongoose');
const seedUsers = require('../seeders/seed-users');
const seedQuestions = require('../seeders/seed-questions');
const seedTests = require('../seeders/seed-tests');
const seedResults = require('../seeders/seed-results');
const seedSubjects = require('../seeders/seed-subjects');
const seedSystems = require('../seeders/seed-systems');
const seedSubSystems = require('../seeders/seed-subsystems');
const seedTopics = require('../seeders/seed-topics');

const runAllSeeders = async () => {
  try {
    await seedUsers();
    await seedSubjects();
    await seedSystems();
    await seedSubSystems();
    await seedTopics();
    await seedQuestions();
    await seedTests();
    await seedResults();
    console.log('🌱 All seeders ran successfully!');
  } catch (err) {
    console.error('❌ Error running seeders:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

runAllSeeders();
