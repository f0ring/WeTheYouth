import express from 'express';
import Story from '../models/Story.js';

const router = express.Router();
// DELETE duplicates
router.delete('/stories/duplicates', async (req, res) => {
  try {
    const stories = await Story.find();
    const titleMap = new Map();
    const duplicatesToDelete = [];

    // Identify duplicates
    stories.forEach(story => {
      if (titleMap.has(story.title)) {
        duplicatesToDelete.push(story._id);
      } else {
        titleMap.set(story.title, story._id);
      }
    });

    // Delete duplicates
    if (duplicatesToDelete.length > 0) {
      await Story.deleteMany({ _id: { $in: duplicatesToDelete } });
      res.json({
        message: `Deleted ${duplicatesToDelete.length} duplicate stories`,
        deletedCount: duplicatesToDelete.length
      });
    } else {
      res.json({ message: 'No duplicates found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET all stories
router.get('/stories', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    
    const stories = await Story.find(filter).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single story by ID
router.get('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new story
router.post('/stories', async (req, res) => {
  try {
    const story = new Story(req.body);
    const savedStory = await story.save();
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update story
router.put('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE story
router.delete('/stories/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET stories by category
router.get('/stories/category/:category', async (req, res) => {
  try {
    const stories = await Story.find({ 
      category: req.params.category 
    }).sort({ createdAt: -1 });
    
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET featured stories
router.get('/stories/featured/true', async (req, res) => {
  try {
    const stories = await Story.find({ featured: true }).sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;