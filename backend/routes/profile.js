const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

// @route   GET /api/profile
// @desc    Lấy thông tin profile của user (Cần đăng nhập)
// @access  Private
router.get('/', authMiddleware, profileController.getProfile);

// @route   PUT /api/profile
// @desc    Cập nhật thông tin profile của user (Cần đăng nhập)
// @access  Private
router.put('/', authMiddleware, profileController.updateProfile);

module.exports = router;
