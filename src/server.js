const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:5173',
    'https://roomie-finder-ub.lovable.app'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/classrooms", require("./routes/classroomRoutes"));
app.use("/api/timetable", require("./routes/timetableRoutes"));
app.use("/api/recommend", require("./routes/recommendRoutes"));
app.use("/api/claims", require("./routes/claimRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "✅ QuickVenue API is running", version: "1.0.0" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 QuickVenue server running on port ${PORT}`);
});