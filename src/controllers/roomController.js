const Classroom = require("../models/Classroom");
const Timetable = require("../models/Timetable");

// Helper: check if two time ranges overlap
const timesOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && end1 > start2;
};

// @desc  Get all classrooms
// @route GET /api/rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Classroom.find({ isActive: true });
    res.json({ success: true, count: rooms.length, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get single classroom
// @route GET /api/rooms/:id
const getRoomById = async (req, res) => {
  try {
    const room = await Classroom.findById(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });

    // Get this room's full weekly schedule
    const schedule = await Timetable.find({ classroom: req.params.id });
    res.json({ success: true, data: { room, schedule } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Get available rooms by day, time, and capacity
// @route GET /api/rooms/available?day=Monday&startTime=08:00&endTime=10:00&capacity=50
const getAvailableRooms = async (req, res) => {
  try {
    const { day, startTime, endTime, capacity } = req.query;

    if (!day || !startTime || !endTime) {
      return res.status(400).json({ success: false, message: "day, startTime and endTime are required" });
    }

    // Get all occupied classrooms at the requested time
    const occupiedEntries = await Timetable.find({ day });
    const occupiedRoomIds = occupiedEntries
      .filter((entry) => timesOverlap(startTime, endTime, entry.startTime, entry.endTime))
      .map((entry) => entry.classroom.toString());

    // Build query
    const query = {
      isActive: true,
      _id: { $nin: occupiedRoomIds },
    };
    if (capacity) query.capacity = { $gte: parseInt(capacity) };

    const availableRooms = await Classroom.find(query).sort({ capacity: 1 });

    res.json({
      success: true,
      count: availableRooms.length,
      data: availableRooms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc  Add a new classroom (admin)
// @route POST /api/rooms
const createRoom = async (req, res) => {
  try {
    const room = await Classroom.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Update a classroom (admin)
// @route PUT /api/rooms/:id
const updateRoom = async (req, res) => {
  try {
    const room = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    res.json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc  Delete a classroom (admin)
// @route DELETE /api/rooms/:id
const deleteRoom = async (req, res) => {
  try {
    const room = await Classroom.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ success: false, message: "Room not found" });
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllRooms, getRoomById, getAvailableRooms, createRoom, updateRoom, deleteRoom };
