const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correctAnswer: String,
  explanation: String,
  tags: [String],
  category: String,
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  type: { type: String, enum: ['MCQ_SINGLE', 'MCQ_MULTIPLE', 'TRUE_FALSE', 'SHORT_ANSWER'] }
});

module.exports = mongoose.model('Question', questionSchema);
