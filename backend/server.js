const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin'); // <-- THÊM DÒNG NÀY (HĐ 3)

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Gắn routes
app.use('/api/auth', authRoutes);       // API cho HĐ 1
app.use('/api/profile', profileRoutes); // API cho HĐ 2
app.use('/api/admin', adminRoutes);     // <-- THÊM DÒNG NÀY (HĐ 3)

// Kết nối MongoDB và Khởi động server
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));
