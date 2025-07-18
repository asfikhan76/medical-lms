const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");
// const { verifyToken } = require("../middleware/authMiddleware");

// Only authenticated users can manage their own tests
router.post("/",  testController.createTest);
router.get("/",  testController.getAllTests);
router.get("/:id",  testController.getTestById);
router.put("/:id",  testController.updateTest);
router.delete("/:id",  testController.deleteTest);

module.exports = router;
