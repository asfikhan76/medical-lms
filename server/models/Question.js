const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionId: { type: Number, unique: true }, 
  text: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  system: { type: mongoose.Schema.Types.ObjectId, ref: 'System', required: true },
  subSystem: { type: mongoose.Schema.Types.ObjectId, ref: 'SubSystem', required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
