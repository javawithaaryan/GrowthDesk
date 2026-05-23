const express = require("express");

const {
  createLead,
  getLeads,
  deleteLead,
} = require("../controllers/leadController");

const router = express.Router();

router.post("/", createLead);

router.get("/", getLeads);

router.delete("/:id", deleteLead);

module.exports = router;