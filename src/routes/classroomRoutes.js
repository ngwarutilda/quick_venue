const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  getAvailableRooms,
  getRecommendedRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/classroomController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAllRooms);
router.get('/available', getAvailableRooms);
router.get('/recommend', getRecommendedRoom);
router.get('/:id', getRoomById);

router.post('/', protect, adminOnly, createRoom);
router.put('/:id', protect, adminOnly, updateRoom);
router.delete('/:id', protect, adminOnly, deleteRoom);

module.exports = router;
