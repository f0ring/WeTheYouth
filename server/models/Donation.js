// models/Donation.js - UPDATED
import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be at least 1']
  },
  section: {
    type: String,
    required: [true, 'Section is required'],
    enum: ['Education', 'Health', 'Environment', 'General Fund']
  },
  message: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  paymentMethod: {
    type: String,
    enum: ['bkash', 'direct'],
    default: 'direct'
  },
  transactionId: {
    type: String,
    default: ''
  },
  senderPhone: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for better performance
donationSchema.index({ user: 1, createdAt: -1 });
donationSchema.index({ status: 1 });

export default mongoose.model('Donation', donationSchema);