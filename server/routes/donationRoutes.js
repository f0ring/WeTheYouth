import express from 'express';
import Donation from '../models/Donation.js';

const router = express.Router();

// POST a new donation
router.post('/', async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: 'Donation submitted successfully!', donation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
