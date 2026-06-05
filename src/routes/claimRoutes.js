const express = require('express');
const router = express.Router();
const { createClaim, cancelClaim, getActiveClaims } = require('../controllers/claimController');
const { protect } = require('../middleware/auth');

router.get('/', getActiveClaims);
router.post('/', protect, createClaim);
router.delete('/:id', protect, cancelClaim);

module.exports = router;