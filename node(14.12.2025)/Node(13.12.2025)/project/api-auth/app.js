const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

connectDB();
app.use(express.json());

app.use("/api/auth", authRoutes);

// Protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});

module.exports = app;
