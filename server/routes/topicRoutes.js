const express = require("express");
const router = express.Router();
const { createTopic, getAllTopics } = require("../controllers/topicController");

router.post("/", createTopic);
router.get("/", getAllTopics);

module.exports = router;
