const express = require("express");
const cors = require("cors");
require("dotenv").config();

//  Import the connectDB function
const connectDB = require("./config/db");  // make sure the path is correct

// Routes
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

const app = express();

//  Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Default route
app.get("/api", (req, res) => {
  res.send("Welcome to Lead Management System");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));