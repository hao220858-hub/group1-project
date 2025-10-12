const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import model User

// POST /api/users - Tạo người dùng mới
router.post('/', async (req, res) => {
    try {
        // Tạo instance User từ dữ liệu request body
        const newUser = new User(req.body); 
        await newUser.save();

        res.status(201).json({ 
            message: 'Tạo người dùng thành công!',
            user: newUser 
        });

    } catch (error) {
        // Xử lý lỗi trùng lặp (email unique)
        if (error.code === 11000) { 
            return res.status(409).json({ message: 'Email này đã tồn tại.' });
        }
        // Xử lý các lỗi validation hoặc lỗi server khác
        res.status(400).json({ message: 'Tạo người dùng thất bại.', error: error.message });
    }
});

// GET /api/users - Lấy tất cả người dùng
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả tài liệu User
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu.', error: error.message });
    }
});

module.exports = router;
