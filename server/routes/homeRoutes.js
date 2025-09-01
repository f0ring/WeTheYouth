import express from 'express';
import HomeStats from '../models/HomeStats.js';

const router = express.Router();

// GET current statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await HomeStats.getCurrentStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE statistics (admin only)
router.put('/stats', async (req, res) => {
  try {
    const stats = await HomeStats.findOneAndUpdate(
      {},
      { ...req.body, lastUpdated: new Date() },
      { new: true, upsert: true }
    );
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;