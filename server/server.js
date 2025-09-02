import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import homeRoutes from './routes/homeRoutes.js';
// Add this import with your other imports
import aboutRoutes from './routes/aboutRoutes.js';

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
app.use('/api/home', homeRoutes);
// Add this with your other route registrations
app.use('/api/about', aboutRoutes);
// Routes
app.get('/api/db-status', async (req, res) => {
  try {
    // Check if MongoDB is connected
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
      databaseName: mongoose.connection.name,
      host: mongoose.connection.host
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

app.get('/api/home/stats', (req, res) => {
  res.json({
    volunteers: 500,
    cities: 7,
    actions: 3000,
    source: 'database-connected'
  });
});

const PORT = process.env.PORT || 5000;

// Start server first, then try to connect to DB
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log('🔗 Test: http://localhost:5000/api/test');
});

// Try to connect to MongoDB
connectDb().then(() => {
  console.log('✅ MongoDB connection attempted');
}).catch(error => {
  console.log('⚠️  Server running without MongoDB');
});