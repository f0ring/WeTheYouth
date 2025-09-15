import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  interestedSection: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Volunteer', volunteerSchema);