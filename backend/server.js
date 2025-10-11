const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express(); // Phải khởi tạo app ở đây

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB
const dbURI = 'mongodb+srv://Hao:Hao123456@cluster0.dq61akf.mongodb.net/groupDB?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...')) // Bỏ comment ở dòng này
    .catch(err => console.log(err));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));