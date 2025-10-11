const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Nhóm các route cho đường dẫn '/'
router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

// Nhóm các route cho đường dẫn '/:id'
router.route('/:id')
    .put(userController.updateUser)    // <- Phải có .updateUser ở đây
    .delete(userController.deleteUser);  // <- Phải có .deleteUser ở đây

module.exports = router;