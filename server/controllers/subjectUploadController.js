const XLSX = require("xlsx");
const SubjectModel = require("../models/SubjectModel");
const SystemModel = require("../models/SystemModel");
const SubSystemModel = require("../models/SubSystemModel");
const TopicModel = require("../models/TopicModel");

exports.uploadSubjects = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    let inserted = 0;
    let skipped = 0;
    const errors = [];

    for (const [index, row] of rows.entries()) {
      try {
        const { subject, system, subSystem, topic } = row;

        if (!subject || !system || !subSystem || !topic) {
          skipped++;
          errors.push(`Row ${index + 2}: Missing required field(s)`);
          continue;
        }

        // SUBJECT
        let subjectDoc = await SubjectModel.findOne({ name: subject.trim() });
        if (!subjectDoc) {
          subjectDoc = await SubjectModel.create({ name: subject.trim() });
        }

        // SYSTEM
        let systemDoc = await SystemModel.findOne({ name: system.trim(), subject: subjectDoc._id });
        if (!systemDoc) {
          systemDoc = await SystemModel.create({
            name: system.trim(),
            subject: subjectDoc._id,
          });
        }

        // SUBSYSTEM
        let subSystemDoc = await SubSystemModel.findOne({ name: subSystem.trim(), system: systemDoc._id });
        if (!subSystemDoc) {
          subSystemDoc = await SubSystemModel.create({
            name: subSystem.trim(),
            system: systemDoc._id,
          });
        }

        // TOPIC
        let topicDoc = await TopicModel.findOne({ name: topic.trim(), subSystem: subSystemDoc._id });
        if (!topicDoc) {
          await TopicModel.create({
            name: topic.trim(),
            subSystem: subSystemDoc._id,
          });
        }

        inserted++;

      } catch (err) {
        skipped++;
        errors.push(`Row ${index + 2}: ${err.message}`);
      }
    }

    res.status(200).json({
      message: 'Upload complete.',
      inserted,
      skipped,
      errors
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({
      message: 'Server error while processing the file.',
      error: err.message
    });
  }
};
