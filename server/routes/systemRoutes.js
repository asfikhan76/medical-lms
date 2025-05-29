const express = require("express");
const router = express.Router();
const { createSystem, getAllSystems } = require("../controllers/systemController");

router.post("/", createSystem);
router.get("/", getAllSystems);

module.exports = router;
