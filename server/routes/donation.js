import express from 'express';
import Donation from '../models/Donation.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Submit donation
router.post('/', auth, async (req, res) => {
  try {
    console.log('Donation received:', req.body);
    
    const donation = new Donation({
      ...req.body,
      user: req.user.id
    });
    
    await donation.save();
    res.status(201).json({ 
      message: 'Donation submitted successfully', 
      donation 
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Get user's donations - MAKE SURE THIS IS OUTSIDE THE POST ROUTE!
router.get('/my-donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;