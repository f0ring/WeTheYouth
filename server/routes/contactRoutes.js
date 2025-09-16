import express from 'express';
import Contact from '../models/contactModel.js';
import auth from '../middleware/auth.js'; // Changed from { authenticateToken }

const router = express.Router();

// Submit contact form
router.post('/', auth, async (req, res) => { // Changed from authenticateToken to auth
  try {
    const { name, email, message } = req.body;
    
    const newContact = new Contact({
      name,
      email,
      message,
      userId: req.user.id // Add user ID from authenticated user
    });
    
    await newContact.save();
    
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;