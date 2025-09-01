import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: { type: String, required: true },
  quote: String,
  content: { type: String, required: true },
  imageUrl: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Story', storySchema);