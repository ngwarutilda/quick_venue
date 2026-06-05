const Classroom = require('../models/Classroom');
const Timetable = require('../models/Timetable');
const { isTimeOverlapping, rankByBestFit } = require('../utils/timeHelper');

// @desc    Get all classrooms
// @route   GET /api/rooms
// @access  Public
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Classroom.find({ isActive: true });
    res.status(200).json({ success: true, count: rooms.length, data: rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single classroom by ID
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res) => {
  try {
    const room = await Classroom.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }

    // Get full schedule for this room
    const schedule = await Timetable.find({ classroom: room._id });

    res.status(200).json({ success: true, data: { room, schedule } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get available rooms based on day, time, and capacity
// @route   GET /api/rooms/available?day=Monday&time=10:00&capacity=50
// @access  Public
const getAvailableRooms = async (req, res) => {
  try {
    const { day, time, capacity } = req.query;

    if (!day || !time) {
      return res.status(400).json({ success: false, message: 'Day and time are required' });
    }

    // Get all active rooms that meet capacity requirement
    const capacityFilter = capacity ? { capacity: { $gte: Number(capacity) } } : {};
    const allRooms = await Classroom.find({ isActive: true, ...capacityFilter });

    // Get all bookings for the given day
    const bookings = await Timetable.find({ day }).populate('classroom');

    // Find which rooms are occupied at the requested time
    const occupiedRoomIds = bookings
      .filter((booking) => isTimeOverlapping(time, booking.startTime, booking.endTime))
      .map((booking) => booking.classroom._id.toString());

    // Filter out occupied rooms
    const availableRooms = allRooms.filter(
      (room) => !occupiedRoomIds.includes(room._id.toString())
    );

    const occupiedRooms = allRooms.filter((room) =>
      occupiedRoomIds.includes(room._id.toString())
    );

    const rankedRooms = availableRooms.map((room, index) => ({
  ...room.toObject(),
  available: true,
  bestMatch: index === 0,
}));

const occupiedWithStatus = occupiedRooms.map((room) => ({
  ...room.toObject(),
  available: false,
  bestMatch: false,
}));

res.status(200).json({
  success: true,
  count: rankedRooms.length,
  data: [...rankedRooms, ...occupiedWithStatus],
});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get best room recommendation
// @route   GET /api/rooms/recommend?day=Monday&time=10:00&capacity=50
// @access  Public
const getRecommendedRoom = async (req, res) => {
  try {
    const { day, time, capacity } = req.query;

    if (!day || !time || !capacity) {
      return res.status(400).json({
        success: false,
        message: 'Day, time, and capacity are required for recommendation',
      });
    }

    // Reuse availability logic
    const allRooms = await Classroom.find({ isActive: true, capacity: { $gte: Number(capacity) } });
    const bookings = await Timetable.find({ day });

    const occupiedRoomIds = bookings
      .filter((b) => isTimeOverlapping(time, b.startTime, b.endTime))
      .map((b) => b.classroom.toString());

    const availableRooms = allRooms.filter(
      (room) => !occupiedRoomIds.includes(room._id.toString())
    );

    if (availableRooms.length === 0) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No available rooms match your criteria',
      });
    }

    // Rank by best capacity fit
    const ranked = rankByBestFit(availableRooms, Number(capacity));
    const bestRoom = ranked[0];

    res.status(200).json({
      success: true,
      data: bestRoom,
      message: `Recommended Room: ${bestRoom.name} – best fit based on capacity and availability`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new classroom
// @route   POST /api/rooms
// @access  Admin
const createRoom = async (req, res) => {
  try {
    const room = await Classroom.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a classroom
// @route   PUT /api/rooms/:id
// @access  Admin
const updateRoom = async (req, res) => {
  try {
    const room = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a classroom
// @route   DELETE /api/rooms/:id
// @access  Admin
const deleteRoom = async (req, res) => {
  try {
    const room = await Classroom.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Classroom not found' });
    }
    res.status(200).json({ success: true, message: 'Classroom deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  getAvailableRooms,
  getRecommendedRoom,
  createRoom,
  updateRoom,
  deleteRoom,
};
