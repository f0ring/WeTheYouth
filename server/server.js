import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import homeRoutes from './routes/homeRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import authRoutes from './routes/auth.js';
import donationRoutes from './routes/donation.js';
import contactRoutes from './routes/contactRoutes.js';
import volunteerRoutes from './routes/volunteer.js';
import adminRoutes from './routes/admin.js';

// Load environment variables
dotenv.config();

console.log('Environment check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ NOT Loaded');
console.log('PORT:', process.env.PORT);

// Connect to MongoDB
const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Don't exit - let server run without DB
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the server 🚀");
});

app.get('/api/db-status', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const statusMessages = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting'
    };

    res.json({
      database: 'MongoDB',
      status: statusMessages[dbStatus] || 'Unknown',
      readyState: dbStatus,
      databaseName: mongoose.connection.name || 'Not connected',
      host: mongoose.connection.host || 'Not connected'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    message: 'WeTheYouth API is operational'
  });
});


// Main Routes Middleware
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/test`);
});

// Try to connect to MongoDB
connectDb()
  .then(() => {
    console.log('✅ MongoDB connection attempted');
  })
  .catch(error => {
    console.log('⚠  Server running without MongoDB');
  });
