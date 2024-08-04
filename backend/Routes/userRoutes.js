const express = require("express");
const { loginUser, verifyOTP } = require("../Controllers/userControllers");
const router = express.Router();
router.post("/", loginUser);
router.post("/verifyOTP", verifyOTP);

module.exports = router;
