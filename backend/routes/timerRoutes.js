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
        timeSpent: 0, 
      });
    } else {
      timer.isRunning = true;
      timer.startedAt = new Date(); 
    }

    await timer.save();
    res.json(timer); 
  } catch (error) {
    console.error('Timer start error:', error);
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

router.get('/', async (req, res) => {
  try {
    const timers = await Timer.find();
    const result = {};
    timers.forEach(timer => {
      result[timer.projectId] = {
        isRunning: timer.isRunning,
        startedAt: timer.startedAt,
        timeSpent: timer.timeSpent,
      };
    });
    res.json(result);
  } catch (error) {
    console.error('Error fetching timers:', error);
    res.status(500).json({ message: 'Error fetching timers' });
  }
});

module.exports = router;
