const Classroom = require("../models/Classroom");
const Timetable = require("../models/Timetable");

// Helper: check if two time ranges overlap
const timesOverlap = (start1, end1, start2, end2) => {
  return start1 < end2 && end1 > start2;
};

// @desc  Get best room recommendation
// @route GET /api/recommend?day=Monday&startTime=08:00&endTime=10:00&capacity=50
const getRecommendation = async (req, res) => {
  try {
    const { day, startTime, endTime, capacity } = req.query;

    if (!day || !startTime || !endTime || !capacity) {
      return res.status(400).json({
        success: false,
        message: "day, startTime, endTime and capacity are all required",
      });
    }

    const requiredCapacity = parseInt(capacity);

    // Step 1: Find occupied rooms at that time
    const occupiedEntries = await Timetable.find({ day });
    const occupiedRoomIds = occupiedEntries
      .filter((e) => timesOverlap(startTime, endTime, e.startTime, e.endTime))
      .map((e) => e.classroom.toString());

    // Step 2: Get all available rooms that fit the capacity
    const availableRooms = await Classroom.find({
      isActive: true,
      _id: { $nin: occupiedRoomIds },
      capacity: { $gte: requiredCapacity },
    });

    if (availableRooms.length === 0) {
      return res.json({
        success: true,
        recommendation: null,
        message: "No available rooms found for the given criteria",
      });
    }

    // Step 3: Score each room (best fit = smallest capacity that still fits)
    // Bonus points for having a projector
    const scored = availableRooms.map((room) => {
      let score = 0;
      const capacityFit = room.capacity - requiredCapacity;

      // Prefer rooms that are a closer fit (not too big, not too small)
      if (capacityFit <= 20) score += 50;
      else if (capacityFit <= 50) score += 30;
      else score += 10;

      // Bonus for facilities
      if (room.facilities.hasProjector) score += 20;
      if (room.facilities.hasWhiteboard) score += 10;
      if (room.facilities.hasAC) score += 5;

      return { room, score };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);
    const best = scored[0].room;

    // Step 4: Get historical insight (how often is this room free on this day?)
    const totalSlots = await Timetable.countDocuments({ classroom: best._id, day });

    res.json({
      success: true,
      recommendation: {
        room: best,
        reason: `Best fit for ${requiredCapacity} students. Capacity: ${best.capacity}. ${
          best.facilities.hasProjector ? "Has projector. " : ""
        }${best.facilities.hasAC ? "Has AC." : ""}`,
        historicalNote: `This room has ${totalSlots} scheduled class(es) on ${day}s — currently free at your requested time.`,
        allAvailable: availableRooms.length,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getRecommendation };
