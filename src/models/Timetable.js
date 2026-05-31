const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    day: {
      type: String,
      required: true,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
    startTime: { type: String, required: true }, // e.g. "08:00"
    endTime: { type: String, required: true },   // e.g. "10:00"
    courseName: { type: String, required: true },
    courseCode: { type: String },
    lecturerName: { type: String, required: true },
    department: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);
