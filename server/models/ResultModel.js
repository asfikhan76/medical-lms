const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
      },
      selectedOption: String, // or [String] for MCQ_MULTIPLE
      isCorrect: Boolean
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Result", resultSchema);
