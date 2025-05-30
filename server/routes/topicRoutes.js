const express = require("express");
const router = express.Router();
const {
  createTopic,
  getAllTopics,
  updateTopic,
  deleteTopic
} = require("../controllers/topicController");

router.post("/", createTopic);
router.get("/", getAllTopics);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
