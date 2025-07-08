const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Question = require('../models/QuestionModel');
const Subject = require('../models/SubjectModel');
const System = require('../models/SystemModel');
const SubSystem = require('../models/SubSystemModel');
const Topic = require('../models/TopicModel');

const seedQuestions = async () => {
  await connectDB();
  await Question.deleteMany();

  // Fetching references
  const subject = await Subject.findOne({ name: 'Computer Science' }) || await Subject.findOne(); // fallback if not found
  const system = await System.findOne({ subject: subject._id }) || await System.findOne();
  const subSystem = await SubSystem.findOne({ system: system._id }) || await SubSystem.findOne();
  const topic = await Topic.findOne({ subSystem: subSystem._id }) || await Topic.findOne();

  if (!subject || !system || !subSystem || !topic) {
    console.error('❌ Required references (subject/system/subSystem/topic) not found in DB');
    process.exit(1);
  }

  const questions = [
    {
      questionId: 1,
      text: "What is 3 x 3?",
      options: ["6", "9", "12", "15"],
      correctAnswer: "9",
      explanation: "3 multiplied by 3 is 9.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    },
    {
      questionId: 2,
      text: "Which are prime numbers?",
      options: ["2", "3", "4", "6"],
      correctAnswer: "2,3",
      explanation: "2 and 3 are prime numbers.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    },
    {
      questionId: 3,
      text: "Which of the following is NOT a programming language?",
      options: ["Python", "JavaScript", "HTML", "C++"],
      correctAnswer: "HTML",
      explanation: "HTML is a markup language, not a programming language.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    },
    {
      questionId: 4,
      text: "Select all frontend technologies.",
      options: ["React", "Node.js", "CSS", "Express"],
      correctAnswer: "React,CSS",
      explanation: "React and CSS are used in frontend development.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    },
    {
      questionId: 5,
      text: "True or False: The Earth is the center of the universe.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "This is a geocentric model which has been proven incorrect.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    },
    {
      questionId: 6,
      text: "What is the capital of France?",
      options: [],
      correctAnswer: "Paris",
      explanation: "Paris is the capital city of France.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    },
    {
      questionId: 7,
      text: "What is the output of: `typeof null` in JavaScript?",
      options: ["null", "undefined", "object", "number"],
      correctAnswer: "object",
      explanation: "This is a long-standing quirk in JavaScript.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    },
    {
      questionId: 8,
      text: "Which of the following are JavaScript frameworks or libraries?",
      options: ["Vue", "Laravel", "Angular", "Django"],
      correctAnswer: "Vue,Angular",
      explanation: "Vue and Angular are JavaScript frameworks. Laravel and Django are backend frameworks.",
      subject: subject._id,
      system: system._id,
      subSystem: subSystem._id,
      topic: topic._id
    }
  ];

  await Question.insertMany(questions);
  console.log('✅ Seeded questions');
};

module.exports = seedQuestions;
