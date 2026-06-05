const Claim = require('../models/Claim');

const getActiveClaims = async (req, res) => {
  try {
    await Claim.deleteMany({ expiresAt: { $lt: new Date() } });
    const claims = await Claim.find().populate('classroom');
    res.json({ success: true, data: claims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createClaim = async (req, res) => {
  try {
    const { classroomId, day, time } = req.body;
    const existing = await Claim.findOne({ classroom: classroomId, expiresAt: { $gt: new Date() } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Room is already claimed' });
    }
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const claim = await Claim.create({
      classroom: classroomId,
      user: req.user._id,
      userName: req.user.name,
      expiresAt,
      day,
      time,
    });
    res.status(201).json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ success: false, message: 'Claim not found' });
    if (claim.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    await claim.deleteOne();
    res.json({ success: true, message: 'Claim cancelled' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getActiveClaims, createClaim, cancelClaim };