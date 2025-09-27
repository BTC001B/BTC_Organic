const jwt = require('jsonwebtoken');
require('dotenv').config();

// First declare everything

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};

// ✅ Define this AFTER both are created
const verifyAdminToken = [authenticateToken, isAdmin];

// ✅ Export all at the bottom
module.exports = {
  authenticateToken,
  isAdmin,
  verifyAdminToken
};
