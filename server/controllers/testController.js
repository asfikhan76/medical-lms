const TestModel = require("../models/TestModel");

// ✅ Create a test
exports.createTest = async (req, res) => {
  try {
    const test = new TestModel({
      ...req.body,
      createdBy: req.user.id
    });
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all tests created by the current user
exports.getAllTests = async (req, res) => {
  try {
    const tests = await TestModel.find({ createdBy: req.user.id }).populate("questions.question");
    res.json(tests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get a single test by ID (only if created by the user)
exports.getTestById = async (req, res) => {
  try {
    const test = await TestModel.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    }).populate("questions.question");
    if (!test) return res.status(404).json({ error: "Test not found or unauthorized" });
    res.json(test);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update a test
exports.updateTest = async (req, res) => {
  try {
    const updatedTest = await TestModel.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedTest) return res.status(404).json({ error: "Test not found or unauthorized" });
    res.json(updatedTest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Delete a test
exports.deleteTest = async (req, res) => {
  try {
    const deleted = await TestModel.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });
    if (!deleted) return res.status(404).json({ error: "Test not found or unauthorized" });
    res.json({ message: "Test deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
