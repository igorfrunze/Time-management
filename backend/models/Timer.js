const mongoose = require('mongoose');

const TimerSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  timeSpent: { type: Number, default: 0 },
  isRunning: { type: Boolean, default: false },
  startedAt: { type: Date },
});
