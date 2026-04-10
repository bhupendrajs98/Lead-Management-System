const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header: "Bearer <token>"
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next(); // proceed to the protected route
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;