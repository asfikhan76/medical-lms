const System = require("../models/System");

exports.createSystem = async (req, res) => {
  try {
    const system = await System.create(req.body);
    res.status(201).json(system);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSystems = async (req, res) => {
  try {
    const systems = await System.find().populate("subject");
    res.json(systems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
