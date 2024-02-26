const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwtConfig");

const User = require("../models/Auth");

const verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "شما مجوز دسترسی به این صفحه را ندارید",
    });
  }

  jwt.verify(token, jwtSecret, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(403).json({
        success: false,
        message: "Failed to Authenticate token",
        error,
      });
    }
    try {
      const user = User.findById(decoded.user_id);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(200).json({
          success: false,
          message: "کاربر مورد نظر وجود ندارد",
        });
      }
    } catch (error) {
      console.log("Error finding user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
};

module.exports = verifyToken;
