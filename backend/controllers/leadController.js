const Lead = require("../models/Lead");

// ---------------- STATUS FORMATTER ----------------
const formatStatus = (status) => {
  if (!status) return "New";

  const map = {
    new: "New",
    contacted: "Contacted",
    qualified: "Qualified",
    lost: "Lost",
  };

  return map[status.toLowerCase()] || "New";
};

// ---------------- GET ALL LEADS ----------------
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ userId: req.user._id });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- GET SINGLE LEAD ----------------
const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- CREATE LEAD (FIXED) ----------------
const createLead = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newLead = new Lead({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      status: formatStatus(status), // 
      userId: req.user._id,
    });

    const saved = await newLead.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.log("CREATE LEAD ERROR:", error);

    res.status(500).json({
      message: "Lead creation failed",
      error: error.message,
    });
  }
};

// ---------------- UPDATE LEAD ----------------
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    //  IMPORTANT: normalize status on update too
    if (req.body.status) {
      req.body.status = formatStatus(req.body.status);
    }

    const updatedLead = await Lead.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      {
        ...req.body,
        email: req.body.email?.trim().toLowerCase(),
        name: req.body.name?.trim(),
        phone: req.body.phone?.trim(),
      },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- DELETE LEAD ----------------
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLead = await Lead.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ---------------- EXPORTS ----------------
module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};