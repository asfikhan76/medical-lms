const UserModel = require("../models/UserModel");

// Get logged-in user's profile
exports.getMyProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users (admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user (self or admin)
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;

    // Only allow update if admin or updating own profile
    if (req.user.role !== "admin" && req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, updates, {
      new: true
    }).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
