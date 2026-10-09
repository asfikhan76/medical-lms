const express = require("express");
const router = express.Router();
const {
  createSubSystem,
  getAllSubSystems,
  updateSubSystem,
  deleteSubSystem
} = require("../controllers/subSystemController");

router.post("/", createSubSystem);
router.get("/", getAllSubSystems);
router.put("/:id", updateSubSystem);
router.delete("/:id", deleteSubSystem);

module.exports = router;
