const Test = require("../models/Test");
const Question = require("../models/Question");

// Create test manually with selected questions
exports.createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate("questions.question");
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single test by ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("questions.question");
    if (!test) return res.status(404).json({ error: "Test not found" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a test
exports.updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a test
exports.deleteTest = async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: "Test deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
