const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);