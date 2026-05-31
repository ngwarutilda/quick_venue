const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    building: { type: String, required: true },
    floor: { type: String, default: "Ground Floor" },
    capacity: { type: Number, required: true },
    facilities: {
      hasProjector: { type: Boolean, default: false },
      hasWhiteboard: { type: Boolean, default: true },
      hasAC: { type: Boolean, default: false },
      hasComputers: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Classroom", classroomSchema);
