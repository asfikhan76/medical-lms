const Topic = require("../models/Topic");

exports.createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate("subSystem");
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
