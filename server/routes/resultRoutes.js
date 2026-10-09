const express = require("express");
const router = express.Router();
const resultController = require("../controllers/resultController");


// Submit test (student)
router.post("/submit", resultController.submitTest);

// Get own results
router.get("/my",  resultController.getMyResults);

// Admin: Get results for a test
router.get("/test/:testId",  resultController.getResultsByTest);

module.exports = router;
