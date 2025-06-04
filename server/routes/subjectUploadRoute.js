const express = require("express");
const multer = require("multer");
const { uploadSubjects } = require("../controllers/subjectUploadController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), uploadSubjects);

module.exports = router;
