import express from 'express';
import Donation from '../models/Donation.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Submit donation (with or without authentication for Bkash)
router.post('/', async (req, res) => {
  try {
    console.log('Donation received:', req.body);
    
    // For direct donations, require authentication
    if (req.body.paymentMethod !== 'bkash') {
      // This would be your authentication middleware for direct donations
      // For simplicity, I'm keeping it as is but you might want to adjust
      return res.status(401).json({ message: 'Authentication required for direct donations' });
    }
    
    const donation = new Donation(req.body);
    
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

// For authenticated direct donations
router.post('/direct', auth, async (req, res) => {
  try {
    console.log('Direct donation received:', req.body);
    
    const donation = new Donation({
      ...req.body,
      user: req.user.id,
      paymentMethod: 'direct'
    });
    
    await donation.save();
    res.status(201).json({ 
      message: 'Donation submitted successfully', 
      donation 
    });
  } catch (error) {
    console.error('Direct donation error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

export default router;