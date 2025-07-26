const Topic = require('../models/TopicModel');
const SubSystem = require('../models/SubSystemModel');
const System = require('../models/SystemModel');
const Subject = require('../models/SubjectModel');
const Question = require('../models/QuestionModel');
// Create question
 exports.createQuestion = async (req, res) => {
  try {
    const { topic: topicId, questionId, text, options, explanation, type } = req.body;

    const topic = await Topic.findById(topicId).populate({
      path: 'subSystem',
      populate: {
        path: 'system',
        populate: {
          path: 'subject'
        }
      }
    });

    if (!topic || !topic.subSystem || !topic.subSystem.system || !topic.subSystem.system.subject) {
      return res.status(400).json({ message: 'Invalid topic or nested references' });
    }

    const newQuestion = await Question.create({
      questionId,
      text,
      options,
      explanation,
      type,
      topic: topic._id,
      subSystem: topic.subSystem._id,
      system: topic.subSystem.system._id,
      subject: topic.subSystem.system.subject._id
    });

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all questions
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('subject system subSystem topic');
    
    res.status(200).json({ total: questions.length, data: questions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
};

// Get single question
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('subject system subSystem topic');

    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching question' });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const { topic: topicId, questionId, text, options, explanation, type } = req.body;

    const topic = await Topic.findById(topicId).populate({
      path: 'subSystem',
      populate: {
        path: 'system',
        populate: {
          path: 'subject'
        }
      }
    });

    const updated = await Question.findByIdAndUpdate(req.params.id, {
      questionId,
      text,
      options,
      explanation,
      type,
      topic: topic._id,
      subSystem: topic.subSystem._id,
      system: topic.subSystem.system._id,
      subject: topic.subSystem.system.subject._id
    }, { new: true });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Question not found to delete' });

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question' });
  }
};
