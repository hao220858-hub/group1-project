const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile'); // <-- THÊM DÒNG NÀY

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Để parse JSON body

// Gắn routes
app.use('/api/auth', authRoutes); // /api/auth/signup, /api/auth/login
app.use('/api/profile', profileRoutes); // <-- THÊM DÒNG NÀY

// Kết nối MongoDB và khởi động server
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

