const SubSystem = require("../models/SubSystem");

exports.createSubSystem = async (req, res) => {
  try {
    const subSystem = await SubSystem.create(req.body);
    res.status(201).json(subSystem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSubSystems = async (req, res) => {
  try {
    const subSystems = await SubSystem.find().populate("system");
    res.json(subSystems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
