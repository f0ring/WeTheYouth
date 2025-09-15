import express from 'express';
import Volunteer from '../models/Volunteer.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Submit volunteer registration
router.post('/', auth, async (req, res) => {
  try {
    const volunteerData = {
      ...req.body,
      user: req.user.id
    };
    
    const volunteer = new Volunteer(volunteerData);
    await volunteer.save();
    
    res.status(201).json({ 
      message: 'Volunteer registration submitted successfully', 
      volunteer 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's volunteer applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Volunteer.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all volunteers (admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const volunteers = await Volunteer.find()
      .populate('user', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve/reject volunteer application (admin only)
router.put('/:id/status', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const { status } = req.body;
    const updateData = { status };
    
    if (status === 'approved') {
      updateData.approvedAt = new Date();
      updateData.approvedBy = req.user.id;
      
      // Update user's volunteer status
      const volunteerApp = await Volunteer.findById(req.params.id);
      await User.findByIdAndUpdate(volunteerApp.user, {
        isVolunteer: true,
        volunteerSince: new Date()
      });
    }
    
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'firstName lastName email');
    
    res.json({ message: 'Volunteer application updated', volunteer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  // Get user's volunteer applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Volunteer.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
});

export default router;