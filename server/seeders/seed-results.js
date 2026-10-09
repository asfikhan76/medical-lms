// server/seeders/seed-results.js
const connectDB = require('../config/db');
const Result = require('../models/ResultModel');

const seedResults = async () => {
  await connectDB();

  const results = [
    {
        "user": "665b3ff01a3f5c0012345704",
        "test": "665b40071a3f5c0012345705",
        "score": 24,
        "answers": [
          {
            "question": "665b40191a3f5c0012345706",
            "selectedOption": "object",
            "isCorrect": true
          },
          {
            "question": "665b402d1a3f5c0012345707",
            "selectedOption": "Vue,Angular",
            "isCorrect": true
          }
        ],
        "submittedAt": "2025-05-24T16:45:00.000Z"
      },
      {
        "user": "665b3f8a1a3f5c0012345700",
        "test": "665b3fa11a3f5c0012345701",
        "score": 18,
        "answers": [
          {
            "question": "665b3fc11a3f5c0012345702",
            "selectedOption": "9",
            "isCorrect": true
          },
          {
            "question": "665b3fd51a3f5c0012345703",
            "selectedOption": "2,4",
            "isCorrect": false
          }
        ],
        "submittedAt": "2025-05-24T15:30:00.000Z"
      }
      
   
  ];

  await Result.deleteMany(); // clean slate
  await Result.insertMany(results);
  console.log('✅ Result data seeded');
};

module.exports = seedResults;
