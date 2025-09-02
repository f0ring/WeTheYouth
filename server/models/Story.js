import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Story title is required'],
    trim: true,
    maxlength: 200
  },
  quote: {
    type: String,
    trim: true,
    maxlength: 300
  },
  content: { 
    type: String, 
    required: [true, 'Story content is required'],
    maxlength: 1000
  },
  imageUrl: {
    type: String,
    default: ''
  },
  author: {
    type: String,
    default: 'We The Youth Team'
  },
  category: {
    type: String,
    enum: ['environment', 'mental-health', 'rights', 'education', 'community'],
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
storySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better performance
storySchema.index({ category: 1, featured: 1 });
storySchema.index({ createdAt: -1 });

export default mongoose.model('Story', storySchema);