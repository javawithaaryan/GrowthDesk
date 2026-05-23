const express = require("express");

const {
  createLead,
  getLeads,
  deleteLead,
  updateLead,
} = require("../controllers/leadController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createLead);

router.get("/", protect, getLeads);

router.put("/:id", protect, updateLead);

router.delete("/:id", protect, deleteLead);

module.exports = router;