const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: [true, 'Option value is required'],
    trim: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  }
});

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: [true, 'Question ID is required'],
    unique: true
  },
  text: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  options: {
    type: [optionSchema],
    validate: [
      {
        validator: (arr) => arr.length >= 2,
        message: 'At least two options are required'
      },
      {
        validator: (arr) => arr.some(opt => opt.isCorrect),
        message: 'At least one option must be marked correct'
      }
    ]
  },
  explanation: {
    type: String,
    required: [true, 'Explanation is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['mcq', 'checkbox', 'short'],
    default: 'mcq'
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: [true, 'Subject is required']
  },
  system: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'System',
    required: [true, 'System is required']
  },
  subSystem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubSystem',
    required: [true, 'SubSystem is required']
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: [true, 'Topic is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
