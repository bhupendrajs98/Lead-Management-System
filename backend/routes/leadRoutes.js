const express = require("express");
const router = express.Router();

const {
  getLeads,
  getLeadById, 
  createLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

const authMiddleware = require("../middlewares/authMiddleware");

//  All routes protected
router.use(authMiddleware);

// ---------------- ROUTES ----------------

// GET all leads
router.get("/", getLeads);

//  GET single lead 
router.get("/:id", getLeadById);

// CREATE lead
router.post("/", createLead);

// UPDATE lead
router.put("/:id", updateLead);

// DELETE lead
router.delete("/:id", deleteLead);

module.exports = router;