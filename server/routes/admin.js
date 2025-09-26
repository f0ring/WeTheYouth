import express from 'express';
import Donation from '../models/Donation.js';
import Volunteer from '../models/Volunteer.js';
import auth from '../middleware/auth.js';
import { getCarbonReport } from '../middleware/carbonTracker.js';

const router = express.Router();

// Admin middleware
const adminAuth = async (req, res, next) => {
  try {
    console.log('Admin auth check - User role:', req.user?.role); // Debug log
    
    if (!req.user) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all donations (admin only)
router.get('/donations', auth, adminAuth, async (req, res) => {
  try {
    console.log('Fetching admin donations for user:', req.user.id); // Debug log
    
    const donations = await Donation.find()
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    console.log('Found donations:', donations.length); // Debug log
    res.json(donations);
  } catch (error) {
    console.error('Admin donations error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all volunteers (admin only)
router.get('/volunteers', auth, adminAuth, async (req, res) => {
  try {
    const volunteers = await Volunteer.find()
      .populate('user', 'firstName lastName email')
      .populate('approvedBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (error) {
    console.error('Admin volunteers error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update donation status (admin only)
router.put('/donations/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status, transactionId } = req.body;
    
    const updateData = { status };
    if (status === 'completed') {
      updateData.paymentDate = new Date();
    }
    if (transactionId) {
      updateData.transactionId = transactionId;
    }

    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'firstName lastName email');

    res.json({ message: 'Donation status updated', donation });
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update volunteer status (admin only)
router.put('/volunteers/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    
    const updateData = { status };
    if (status === 'approved') {
      updateData.approvedBy = req.user.id;
      updateData.approvedAt = new Date();
    } else if (status === 'rejected') {
      updateData.approvedBy = null;
      updateData.approvedAt = null;
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'firstName lastName email')
     .populate('approvedBy', 'firstName lastName');

    res.json({ message: 'Volunteer status updated', volunteer });
  } catch (error) {
    console.error('Update volunteer error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
router.get('/carbon-report', auth, adminAuth, async (req, res) => {
  try {
    const report = getCarbonReport(req.app);
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error generating carbon report', error: error.message });
  }
});

export default router;