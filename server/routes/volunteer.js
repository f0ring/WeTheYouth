import express from 'express';
import Volunteer from '../models/Volunteer.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Submit volunteer registration
router.post('/', async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json({ message: 'Volunteer registration submitted successfully', volunteer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all volunteers (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;