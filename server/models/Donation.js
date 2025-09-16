import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Not required for Bkash donations
  },
  amount: {
    type: Number,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
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

export default mongoose.model('Donation', donationSchema);