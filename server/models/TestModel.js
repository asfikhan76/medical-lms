const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subject: String,
  totalMarks: Number,
  duration: Number, // in minutes
  questions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
      },
      marks: { type: Number, default: 1 }
    }
  ],
  settings: {
    randomizeQuestions: { type: Boolean, default: false },
    negativeMarking: { type: Boolean, default: false },
    negativeMarksPerWrong: { type: Number, default: 0 }
  },
  isPublished: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Test", testSchema);
