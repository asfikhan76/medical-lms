const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpire } = require("../config/jwt");

// Signup
exports.signup = async (req, res) => {
  try {
    const { username, password, role, email, phone } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role,
      email,
      phone
    });

    await user.save();

    res.status(201).json({ message: "Signup successful", user: { username, role, email, phone } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login with JWT
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpire }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
