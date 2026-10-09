const SubjectModel = require('../models/SubjectModel');
const SystemModel = require('../models/SystemModel');
const SubSystemModel = require('../models/SubSystemModel');
const TopicModel = require('../models/TopicModel');

// 📊 Controller to get total counts for dashboard
exports.getDashboardSummary = async (req, res) => {
  try {
    const [totalSubjects, totalSystems, totalSubSystems, totalTopics] = await Promise.all([
      SubjectModel.countDocuments(),
      SystemModel.countDocuments(),
      SubSystemModel.countDocuments(),
      TopicModel.countDocuments()
    ]);

    res.status(200).json({
      totalSubjects,
      totalSystems,
      totalSubSystems,
      totalTopics
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ error: "Server error while fetching dashboard summary" });
  }
};
