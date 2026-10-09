const XLSX = require('xlsx');
const SubjectModel = require('../models/SubjectModel');
const SystemModel = require('../models/SystemModel');
const SubSystemModel = require('../models/SubSystemModel');
const TopicModel = require('../models/TopicModel');
const QuestionModel = require('../models/QuestionModel');

exports.uploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Please upload a valid Excel file.' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    let inserted = 0;
    let skipped = 0;
    const errors = [];

    for (const [index, row] of rows.entries()) {
      try {
        const { subject, system, subSystem, topic, text, options, correctAnswer, explanation } = row;

        // Basic validation
        if (!subject || !system || !subSystem || !topic || !text || !options || !correctAnswer) {
          skipped++;
          errors.push(`Row ${index + 2}: Missing required fields.`);
          continue;
        }

        // Clean and parse options
        const optArray = options.split(',').map(o => o.trim()).filter(o => o);

        if (optArray.length < 2) {
          skipped++;
          errors.push(`Row ${index + 2}: Less than 2 options provided.`);
          continue;
        }

        // SUBJECT
        let subjectDoc = await SubjectModel.findOne({ name: subject.trim() });
        if (!subjectDoc) subjectDoc = await SubjectModel.create({ name: subject.trim() });

        // SYSTEM
        let systemDoc = await SystemModel.findOne({ name: system.trim(), subject: subjectDoc._id });
        if (!systemDoc) systemDoc = await SystemModel.create({ name: system.trim(), subject: subjectDoc._id });

        // SUBSYSTEM
        let subSystemDoc = await SubSystemModel.findOne({ name: subSystem.trim(), system: systemDoc._id });
        if (!subSystemDoc) subSystemDoc = await SubSystemModel.create({ name: subSystem.trim(), system: systemDoc._id });

        // TOPIC
        let topicDoc = await TopicModel.findOne({ name: topic.trim(), subSystem: subSystemDoc._id });
        if (!topicDoc) topicDoc = await TopicModel.create({ name: topic.trim(), subSystem: subSystemDoc._id });

        // Generate unique questionId
        const lastQuestion = await QuestionModel.findOne().sort({ questionId: -1 }).select('questionId');
        const nextQuestionId = lastQuestion ? lastQuestion.questionId + 1 : 1;

        // INSERT QUESTION
        await QuestionModel.create({
          questionId: nextQuestionId,
          text: text.trim(),
          options: optArray,
          correctAnswer: correctAnswer.trim(),
          explanation: explanation?.trim(),
          subject: subjectDoc._id,
          system: systemDoc._id,
          subSystem: subSystemDoc._id,
          topic: topicDoc._id,
        });

        inserted++;

      } catch (rowError) {
        skipped++;
        errors.push(`Row ${index + 2}: ${rowError.message}`);
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
