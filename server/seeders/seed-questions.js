const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Question = require('../models/QuestionModel');
const Subject = require('../models/SubjectModel');
const System = require('../models/SystemModel');
const SubSystem = require('../models/SubSystemModel');
const Topic = require('../models/TopicModel');

const seedQuestions = async () => {
  try {
    await connectDB();
    await Question.deleteMany();

    // Get topic and auto-populate subSystem > system > subject
    const topic = await Topic.findOne().populate({
      path: 'subSystem',
      populate: {
        path: 'system',
        populate: {
          path: 'subject'
        }
      }
    });

    if (!topic || !topic.subSystem || !topic.subSystem.system || !topic.subSystem.system.subject) {
      console.error('❌ Required references (subject/system/subSystem/topic) not found in DB');
      process.exit(1);
    }

    const subject = topic.subSystem.system.subject;
    const system = topic.subSystem.system;
    const subSystem = topic.subSystem;

    const questions = [
      {
        questionId: 1,
        text: "What is 3 x 3?",
        options: [
          { value: "6", isCorrect: false },
          { value: "9", isCorrect: true },
          { value: "12", isCorrect: false },
          { value: "15", isCorrect: false }
        ],
        explanation: "3 multiplied by 3 is 9.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      },
      {
        questionId: 2,
        text: "Which are prime numbers?",
        options: [
          { value: "2", isCorrect: true },
          { value: "3", isCorrect: true },
          { value: "4", isCorrect: false },
          { value: "6", isCorrect: false }
        ],
        explanation: "2 and 3 are prime numbers.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      },
      {
        questionId: 3,
        text: "Which of the following is NOT a programming language?",
        options: [
          { value: "Python", isCorrect: false },
          { value: "JavaScript", isCorrect: false },
          { value: "HTML", isCorrect: true },
          { value: "C++", isCorrect: false }
        ],
        explanation: "HTML is a markup language, not a programming language.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      },
      {
        questionId: 4,
        text: "Select all frontend technologies.",
        options: [
          { value: "React", isCorrect: true },
          { value: "Node.js", isCorrect: false },
          { value: "CSS", isCorrect: true },
          { value: "Express", isCorrect: false }
        ],
        explanation: "React and CSS are used in frontend development.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      },
      {
        questionId: 5,
        text: "True or False: The Earth is the center of the universe.",
        options: [
          { value: "True", isCorrect: false },
          { value: "False", isCorrect: true }
        ],
        explanation: "This is a geocentric model which has been proven incorrect.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      },
      {
        questionId: 6,
        text: "What is the capital of France?",
        options: [
          { value: "Paris", isCorrect: true },
          { value: "London", isCorrect: false },
          { value: "Berlin", isCorrect: false },
          { value: "Madrid", isCorrect: false }
        ],
        explanation: "Paris is the capital city of France.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      },
      {
        questionId: 7,
        text: "What is the output of: `typeof null` in JavaScript?",
        options: [
          { value: "null", isCorrect: false },
          { value: "undefined", isCorrect: false },
          { value: "object", isCorrect: true },
          { value: "number", isCorrect: false }
        ],
        explanation: "This is a long-standing quirk in JavaScript.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      },
      {
        questionId: 8,
        text: "Which of the following are JavaScript frameworks or libraries?",
        options: [
          { value: "Vue", isCorrect: true },
          { value: "Laravel", isCorrect: false },
          { value: "Angular", isCorrect: true },
          { value: "Django", isCorrect: false }
        ],
        explanation: "Vue and Angular are JavaScript frameworks. Laravel and Django are backend frameworks.",
        subject: subject._id,
        system: system._id,
        subSystem: subSystem._id,
        topic: topic._id
      }
    ];

    await Question.insertMany(questions);
    console.log('✅ Seeded questions successfully');

  } catch (error) {
    console.error('❌ Error seeding questions:', error.message);
  }
};

module.exports = seedQuestions;
