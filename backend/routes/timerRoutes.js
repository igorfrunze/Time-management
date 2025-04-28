const express = require('express');
const Timer = require('../models/Timer.js');

const router = express.Router();

router.post('/start', async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    let timer = await Timer.findOne({ userId, projectId });

    if (!timer) {
      timer = new Timer({
        userId,
        projectId,
        isRunning: true,
        startedAt: new Date(),
      });
    } else {
      await timer.save();
      res.json(timer);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error starting timer' });
  }
});

router.post('/stop', async (req, res) => {
  const { userId, projectId } = req.body;

  try {
    const timer = await Timer.findOne({ userId, projectId });
    if (!timer) {
      res.status(404).json({ message: "timer ain't found" });
    }

    if (timer.isRunning) {
      const timeSpent = (new Date() - new Date(timer.startedAt)) / 1000;
      timer.timeSpent += timeSpent;
      timer.isRunning = false;
      await timer.save();
    }
    res.json(timer);
  } catch (error) {
    res.status(500).json({ message: 'error stoping timer' });
  }
});

module.exports = router;
