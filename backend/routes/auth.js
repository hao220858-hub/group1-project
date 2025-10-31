const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// === BẮT ĐẦU (HĐ 1 - SV1) ===

// POST /api/auth/signup
router.post('/signup', authController.signup);

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/logout
router.post('/logout', authController.logout);

// === KẾT THÚC (HĐ 1 - SV1) ===

module.exports = router;
