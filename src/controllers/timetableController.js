const Timetable = require("../models/Timetable");
const Classroom = require("../models/Classroom");

// @desc  Get all timetable entries
// @route GET /api/timetable
const getAllEntries = async (req, res) => {
  try {
    const { day, classroom } = req.query;
    const filter = {};
    if (day) filter.day = day;
    if (classroom) filter.classroom = classroom;

    const entries = await Timetable.find(filter).populate("classroom", "name building capacity");
    res.json({ success: true, count: entries.length, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Add timetable entry (admin)
// @route POST /api/timetable
const createEntry = async (req, res) => {
  try {
    const { classroom, day, startTime, endTime } = req.body;

    // Check for time conflicts in same room on same day
    const conflict = await Timetable.findOne({
      classroom,
      day,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    });

    if (conflict) {
      return res.status(400).json({
        success: false,
        message: `Time conflict: ${conflict.courseName} is already scheduled in this room from ${conflict.startTime} to ${conflict.endTime}`,
      });
    }

    const entry = await Timetable.create(req.body);
    const populated = await entry.populate("classroom", "name building");
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Update timetable entry (admin)
// @route PUT /api/timetable/:id
const updateEntry = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("classroom", "name building");
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });
    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Delete timetable entry (admin)
// @route DELETE /api/timetable/:id
const deleteEntry = async (req, res) => {
  try {
    const entry = await Timetable.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ success: false, message: "Entry not found" });
    res.json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllEntries, createEntry, updateEntry, deleteEntry };
