// server/seeders/seed-tests.js
const connectDB = require('../config/db');
const Test = require('../models/TestModel');

const seedTests = async () => {
    await connectDB();

    const tests = [
        {
            "title": "Environmental Science Basics",
            "description": "Covers topics like ecosystems, pollution, and natural resources.",
            "subject": "Environmental Science",
            "duration": 35,
            "totalMarks": 20,
            "questions": [
                {
                    "question": "665b2d2f1a3f5c0012345691",
                    "marks": 10
                },
                {
                    "question": "665b2d401a3f5c0012345692",
                    "marks": 10
                }
            ],
            "settings": {
                "randomizeQuestions": true,
                "negativeMarking": false,
                "negativeMarksPerWrong": 0
            },
            "isPublished": true
        },
        {
            "title": "World History Overview",
            "description": "Assessment covering major historical events and civilizations.",
            "subject": "History",
            "duration": 45,
            "totalMarks": 30,
            "questions": [
                {
                    "question": "665b2e101a3f5c0012345693",
                    "marks": 15
                },
                {
                    "question": "665b2e1c1a3f5c0012345694",
                    "marks": 15
                }
            ],
            "settings": {
                "randomizeQuestions": false,
                "negativeMarking": true,
                "negativeMarksPerWrong": 1
            },
            "isPublished": true
        }
        , {
            "title": "Introduction to Computer Science",
            "description": "Covers computing basics, algorithms, and data structures.",
            "subject": "Computer Science",
            "duration": 60,
            "totalMarks": 40,
            "questions": [
                {
                    "question": "665b2e2e1a3f5c0012345695",
                    "marks": 20
                },
                {
                    "question": "665b2e381a3f5c0012345696",
                    "marks": 20
                }
            ],
            "settings": {
                "randomizeQuestions": true,
                "negativeMarking": true,
                "negativeMarksPerWrong": 0.5
            },
            "isPublished": false
        }


    ];

    await Test.deleteMany(); // clean first
    await Test.insertMany(tests);
    console.log('✅ Test data seeded');
};

module.exports = seedTests;
