const SystemModel = require("../models/SystemModel");

exports.createSystem = async (req, res) => {
  try {
    const system = await SystemModel.create(req.body);
    res.status(201).json(system);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({
        error: 'System already exists',
      });
    }
    res.status(400).json({
      error: err.message || 'Unexpected error while creating the system.',
    });
  }
};

exports.getAllSystems = async (req, res) => {
  try {
    const systems = await SystemModel.find().populate("subject");
    res.json(systems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSystem = async (req, res) => {
  try {
    const updated = await SystemModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: "System not found" });
    }
    res.json(updated);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ error: 'System name already exists' });
    }
    res.status(400).json({ error: err.message || 'Error updating system' });
  }
};

exports.deleteSystem = async (req, res) => {
  try {
   const system = await SystemModel.findById(req.params.id);
if (!system) {
  return res.status(404).json({ error: "System not found" });
}
await system.deleteOne(); // This triggers the middleware

res.json({ message: "System and related data deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
