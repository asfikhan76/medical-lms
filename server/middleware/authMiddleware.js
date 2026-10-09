const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now req.user has { id, username, role }
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Restrict to role
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
