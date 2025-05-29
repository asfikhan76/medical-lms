const Question = require('../models/Question');
const Counter = require('../models/Counter'); // Import the Counter model

exports.createQuestion = async (req, res) => {
  try {
    // Auto-increment logic
    const counter = await Counter.findOneAndUpdate(
      { name: 'questionId' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    // Create the new question with custom questionId
    const question = new Question({
      ...req.body,
      questionId: counter.value
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all questions (with filters)
exports.getAllQuestions = async (req, res) => {
  try {
    const { category, difficulty, type, tags, search } = req.query;
    

    let filter = {};

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (type) filter.type = type;
    if (tags) {
      const tagsArray = tags.split(','); // comma-separated
      filter.tags = { $in: tagsArray };
    }
    if (search) {
      filter.text = { $regex: search, $options: 'i' }; // case-insensitive search
    }

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id); 
    console.log("question", question)
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bulk upload questions
exports.bulkUpload = async (req, res) => {
  try {
    const questions = await Question.insertMany(req.body);
    res.status(201).json(questions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
