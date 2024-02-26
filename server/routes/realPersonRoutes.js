const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");

// Controllers
const {
  createRealUser,
  showRealUsers,
  addAnswersToRealUser,
} = require("../controllers/realControllers");

router.post("/create", createRealUser);
router.get("/", verifyToken, showRealUsers);
router.post("/add-answers/:nationalCode", addAnswersToRealUser);

module.exports = router;
