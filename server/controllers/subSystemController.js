const SubSystem = require("../models/SubSystem");

exports.createSubSystem = async (req, res) => {
  try {
    const subSystem = await SubSystem.create(req.body);
    res.status(201).json(subSystem);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({
        error: 'Sub-system already exists',
      });
    }

    // Validation or other errors
    return res.status(400).json({
      error: err.message || 'unexpected error while creating the sub-system.',
    });
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
