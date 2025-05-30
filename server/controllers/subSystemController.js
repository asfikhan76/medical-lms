const SubSystem = require("../models/SubSystem");

exports.createSubSystem = async (req, res) => {
  try {
    const subSystem = await SubSystem.create(req.body);
    res.status(201).json(subSystem);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ error: 'Sub-system already exists' });
    }
    return res.status(400).json({ error: err.message || 'Unexpected error while creating the sub-system.' });
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

exports.updateSubSystem = async (req, res) => {
  try {
    const updated = await SubSystem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: "Sub-system not found" });
    }
    res.json(updated);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ error: 'Sub-system name already exists' });
    }
    res.status(400).json({ error: err.message || 'Error updating sub-system' });
  }
};

exports.deleteSubSystem = async (req, res) => {
  try {
    const deleted = await SubSystem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Sub-system not found" });
    }
    res.json({ message: "Sub-system deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
