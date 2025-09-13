import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  section: { type: String, required: true },
  message: { type: String },
  phone: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);
