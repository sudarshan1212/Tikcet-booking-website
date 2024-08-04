const express = require("express");
const {
  postShow,
  deleteShow,
  getShow,
} = require("../Controllers/hostControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", protect, getShow);
router.post("/create", protect, postShow);
router.delete("/:id", protect, deleteShow);
module.exports = router;
