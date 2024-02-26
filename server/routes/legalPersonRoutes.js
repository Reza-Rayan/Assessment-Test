const express = require("express");
const router = express.Router();

// Controllers
const {
  createLegalUser,
  showLegalUsers,
} = require("../controllers/legalControllers");

router.post("/create", createLegalUser);
router.get("/", showLegalUsers);

module.exports = router;
