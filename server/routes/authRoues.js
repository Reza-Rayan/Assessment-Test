const express = require("express");
const router = express.Router();

// Controllers
const { signup, login } = require("../controllers/authController");

router.post("/sign-up", signup);
router.post("/login", login);

module.exports = router;
