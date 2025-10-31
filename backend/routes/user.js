const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import model User

// POST /users - Tạo người dùng mới (Đã có)
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

// GET /users - Lấy tất cả người dùng (Đã có)
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả tài liệu User
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu.', error: error.message });
    }
});

// =======================================================
// *** PHẦN THÊM MỚI (HOẠT ĐỘNG 7) ***
// =======================================================

// PUT /users/:id - Cập nhật (Update) người dùng
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true } // 'new: true' để trả về user sau khi đã update
        );

        if (!updatedUser) {
            // Nếu không tìm thấy user với ID này
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }

        res.json({ message: 'Cập nhật thành công!', user: updatedUser });

    } catch (error) {
        res.status(400).json({ message: 'Cập nhật thất bại.', error: error.message });
    }
});

// DELETE /users/:id - Xóa người dùng
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            // Nếu không tìm thấy user với ID này
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }

        res.json({ message: 'Xóa người dùng thành công!', user: deletedUser });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi xóa.', error: error.message });
    }
});

// =======================================================
// *** KẾT THÚC PHẦN THÊM MỚI ***
// =======================================================

module.exports = router;