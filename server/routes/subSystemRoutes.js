const express = require("express");
const router = express.Router();
const { createSubSystem, getAllSubSystems } = require("../controllers/subSystemController");

router.post("/", createSubSystem);
router.get("/", getAllSubSystems);

module.exports = router;
