const Result = require("../models/Result");
const Question = require("../models/Question");
const Test = require("../models/Test");

exports.submitTest = async (req, res) => {
  try {
    const { testId, answers } = req.body;

    const test = await Test.findById(testId).populate("questions");
    if (!test) return res.status(404).json({ error: "Test not found" });

    let score = 0;
    const resultAnswers = [];

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (!question) continue;

      const isCorrect = question.correctAnswer === ans.selectedOption;
      if (isCorrect) score += 1; // Or question.marks if using variable marks

      resultAnswers.push({
        question: question._id,
        selectedOption: ans.selectedOption,
        isCorrect
      });
    }

    const result = new Result({
      user: req.user.id,
      test: testId,
      score,
      answers: resultAnswers
    });

    await result.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id })
      .populate("test", "title")
      .populate("answers.question", "text");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResultsByTest = async (req, res) => {
  try {
    const results = await Result.find({ test: req.params.testId })
      .populate("user", "username")
      .populate("answers.question", "text");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
