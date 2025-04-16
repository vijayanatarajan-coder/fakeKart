const axios = require("axios");
const User = require("../models/userModel");

module.exports.verifyGoogleAccessToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
    );

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(
      "Invalid access token:",
      error.response?.data || error.message
    );
    return res
      .status(403)
      .json({ error: "Forbidden: Invalid or expired token" });
  }
};

module.exports.checkAdminRole = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};
