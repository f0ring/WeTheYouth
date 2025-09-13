import express from 'express';
import TakeAction from '../models/TakeAction.js';

const router = express.Router();

// POST route to save volunteer
router.post('/', async (req, res) => {
  try {
    console.log("POST /api/takeactions received:", req.body); // Log incoming data

    // Create a new document
    const newEntry = await TakeAction.create(req.body);

    res.status(201).json({
      message: 'Thank you for registering as a Volunteer!',
      data: newEntry
    });
  } catch (err) {
    console.error("Error saving volunteer:", err);
    res.status(500).json({ message: 'Error saving data', error: err.message });
  }
});

export default router;