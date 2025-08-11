const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, restrictTo } = require("../middleware/authMiddleware");

// Get current user's profile
router.get("/me", verifyToken, userController.getMyProfile);

// Get all users (admin only)
router.get("/", verifyToken , restrictTo("admin"), userController.getAllUsers);

// Update user by ID (admin only or self)
router.put("/:id", verifyToken, userController.updateUser);

// Delete user by ID (admin only)
router.delete("/:id", verifyToken, restrictTo("admin"), userController.deleteUser);

module.exports = router;

