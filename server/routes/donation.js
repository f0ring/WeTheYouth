import express from 'express';
import Donation from '../models/Donation.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Single donation endpoint for all donation types
router.post('/', auth, async (req, res) => {
  try {
    console.log('Donation received from user:', req.user.id);
    console.log('Request body:', req.body);
    
    const donation = new Donation({
      ...req.body,
      user: req.user.id, // Always associate with logged-in user
      status: 'completed'
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


// Get user's donations
router.get('/my-donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get community statistics for dashboard
router.get('/community/stats', async (req, res) => {
  try {
    const [
      totalRaised,
      totalDonors,
      recentDonations,
      sectionBreakdown,
      monthlyGoal
    ] = await Promise.all([
      // Total amount raised
      Donation.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      // Total unique donors
      Donation.distinct('user', { status: 'completed' }),
      // Recent donations (last 24 hours)
      Donation.find({ 
        status: 'completed', 
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } 
      }).sort({ createdAt: -1 }).limit(10),
      // Breakdown by section
      Donation.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: '$section', total: { $sum: '$amount' }, count: { $sum: 1 } } }
      ]),
      // Monthly goal progress
      Donation.aggregate([
        { 
          $match: { 
            status: 'completed',
            createdAt: { 
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
          } 
        },
        { $group: { _id: null, monthlyTotal: { $sum: '$amount' } } }
      ])
    ]);

    res.json({
      totalRaised: totalRaised[0]?.total || 0,
      totalDonors: totalDonors.length,
      recentDonations,
      sectionBreakdown,
      monthlyGoal: {
        current: monthlyGoal[0]?.monthlyTotal || 0,
        target: 100000,
        progress: Math.min(((monthlyGoal[0]?.monthlyTotal || 0) / 100000) * 100, 100)
      }
    });
  } catch (error) {
    console.error('Community stats error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Get donation by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Check if user owns this donation or is admin
    if (donation.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(donation);
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Update donation status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { status } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    res.json({ 
      message: 'Donation status updated successfully', 
      donation 
    });
  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
});

export default router;