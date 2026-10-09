const express = require("express");
const router = express.Router();
const {
  createSystem,
  getAllSystems,
  updateSystem,
  deleteSystem
} = require("../controllers/systemController");

router.post("/", createSystem);
router.get("/", getAllSystems);
router.put("/:id", updateSystem);
router.delete("/:id", deleteSystem);

module.exports = router;
