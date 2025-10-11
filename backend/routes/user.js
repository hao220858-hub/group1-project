const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route cho GET /users
router.get('/users', userController.getUsers);

// Route cho POST /users
router.post('/users', userController.createUser);

module.exports = router;