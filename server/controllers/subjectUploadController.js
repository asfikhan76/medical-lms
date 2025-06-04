const XLSX = require("xlsx");
const SubjectModel = require("../models/SubjectModel");

exports.uploadSubjects = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded. Please upload a valid Excel file." });
    }

    // Read the uploaded Excel file
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    // Extract names, trim them, and remove rows with empty names
    const trimmedSubjects = data
      .map((row) => ({ name: row.name?.toString().trim() })) // Ensure name is a string before trim
      .filter((item) => item.name); // Remove empty or undefined names

    if (trimmedSubjects.length === 0) {
      return res.status(400).json({ message: "The file doesn't contain any valid subject names." });
    }

    // Step 1: Remove duplicate subject names within the uploaded file
    const uniqueNames = new Set();
    const rawSubjects = [];
    for (const subject of trimmedSubjects) {
      if (!uniqueNames.has(subject.name)) {
        uniqueNames.add(subject.name);
        rawSubjects.push(subject);
      }
    }

    if (rawSubjects.length === 0) {
      return res.status(400).json({ message: "No unique subjects found in the file." });
    }

    // Step 2: Get subjects that already exist in DB
    const existing = await SubjectModel.find({ name: { $in: rawSubjects.map(s => s.name) } });
    const existingNames = new Set(existing.map(s => s.name));

    // Step 3: Filter out existing subjects
    const newSubjects = rawSubjects.filter(s => !existingNames.has(s.name));

    // Step 4: Insert new unique subjects
    if (newSubjects.length > 0) {
      await SubjectModel.insertMany(newSubjects);
    }

    res.status(200).json({
      message: "Subjects processed successfully!",
      totalInFile: data.length,
      validSubjects: rawSubjects.length,
      inserted: newSubjects.length,
      skipped: rawSubjects.length - newSubjects.length, // skipped due to already existing in DB
      duplicatesInFileRemoved: trimmedSubjects.length - rawSubjects.length,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({
      message: "Server error while processing the upload.",
      error: err.message,
      suggestion: "Ensure the file is in correct format with a 'name' column.",
    });
  }
};
