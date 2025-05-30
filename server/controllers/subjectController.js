const Subject = require("../models/Subject");

exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (err) {
    console.error('Error creating subject:', err);

    // Duplicate key error
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(400).json({
        error: 'Subject already exists',
      });
    }

    // Validation or other errors
    return res.status(400).json({
      error: err.message || 'unexpected error occurred while creating the subject.',
    });
  }
};


exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
