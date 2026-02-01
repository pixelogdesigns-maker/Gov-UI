const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected (Local)');
  } catch (err) {
    console.warn('⚠️ Local MongoDB not found. Starting In-Memory MongoDB...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
    console.log(`✅ In-Memory MongoDB Connected at ${uri}`);

    // Seed data since it's a fresh in-memory DB
    console.log('🌱 Seeding In-Memory Data...');
    require('./seed');
  }
};
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/masters', require('./routes/masterRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
