const express = require("express");
const {
  userHoster,
  registerHoster,
} = require("../Controllers/showControllers");
const router = express.Router();
router.post("/", userHoster);
router.post("/signup", registerHoster);
module.exports = router;
