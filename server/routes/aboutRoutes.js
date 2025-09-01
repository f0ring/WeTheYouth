import express from 'express';
import Story from '../models/Story.js';

const router = express.Router();

// GET all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Error fetching stories' });
  }
});

// GET team members
router.get('/team', async (req, res) => {
  try {
    // This would fetch team members from database
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members' });
  }
});

// GET impact statistics
router.get('/impact', async (req, res) => {
  try {
    // This would fetch impact statistics
    res.json({});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching impact stats' });
  }
});

export default router;