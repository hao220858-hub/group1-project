const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/user'); // ✅ đúng đường dẫn

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ gắn route ở đây
app.use('/api/users', userRoutes);

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));
