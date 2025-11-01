const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // Import middleware admin

// @route   GET /api/admin/users
// @desc    Lấy tất cả user
// @access  Private (Admin)
// Yêu cầu: 1. Đã đăng nhập (authMiddleware), 2. Là Admin (adminMiddleware)
router.get(
    '/users', 
    authMiddleware, 
    adminMiddleware, 
    adminController.getAllUsers
);

// @route   DELETE /api/admin/users/:id
// @desc    Xóa user theo ID
// @access  Private (Admin)
router.delete(
    '/users/:id', 
    authMiddleware, 
    adminMiddleware, 
    adminController.deleteUser
);

module.exports = router;
