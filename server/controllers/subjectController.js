const SubjectModel = require("../models/SubjectModel");

exports.createSubject = async (req, res) => {
  try {
    const subject = await SubjectModel.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    console.error('Error creating subject:', err);

    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ error: 'Subject already exists' });
    }

    return res.status(400).json({
      error: err.message || 'Unexpected error occurred while creating the subject.',
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const updated = await SubjectModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.json(updated);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({ error: 'Subject name already exists' });
    }
    res.status(400).json({ error: err.message || 'Error updating subject' });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const deleted = await SubjectModel.findOneAndDelete({ _id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.json({ message: "Subject and related data deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

