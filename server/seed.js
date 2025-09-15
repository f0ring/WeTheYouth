import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Cause from './models/causeModel.js';
import Contact from './models/contactModel.js';

dotenv.config();

const seedData = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected');

    await Cause.deleteMany();
    await Contact.deleteMany();

    await Cause.insertMany([
      { title: 'Climate Action', description: 'Promoting environmental awareness and tree plantation drives.' },
      { title: 'Youth Education', description: 'Providing free workshops and mentoring sessions for underprivileged students.' },
      { title: 'Mental Health', description: 'Organizing counseling sessions and mental health awareness campaigns.' }
    ]);

    await Contact.insertMany([
      { name: 'John Doe', email: 'john@example.com', message: 'Interested in volunteering!' },
      { name: 'Jane Smith', email: 'jane@example.com', message: 'Looking for collaboration opportunities.' }
    ]);

    console.log('🌱 Seeding Successful!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
