const TopicModel = require("../models/TopicModel");

exports.createTopic = async (req, res) => {
  try {
    const topic = await TopicModel.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ error: 'Topic already exists' });
    }
    res.status(400).json({ error: err.message || 'Unexpected error while creating the topic.' });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await TopicModel.find()
      .populate({
        path: 'subSystem',
        populate: {
          path: 'system',
          populate: {
            path: 'subject'
          }
        }
      });

    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTopic = async (req, res) => {
  try {
    const updated = await TopicModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json(updated);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ error: 'Topic name already exists' });
    }
    res.status(400).json({ error: err.message || 'Error updating topic' });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const deleted = await TopicModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Topic not found" });
    }
    res.json({ message: "Topic deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
