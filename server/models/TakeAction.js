import mongoose from 'mongoose';

const takeActionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  interestedSection: { type: String, required: true },
  age: { type: Number, required: true },
  occupation: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('TakeAction', takeActionSchema);
