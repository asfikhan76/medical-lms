const express = require("express");
const multer = require("multer");
const { uploadQuestions } = require("../controllers/questionUploadController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), uploadQuestions);

module.exports = router;
