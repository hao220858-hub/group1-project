const User = require('../models/User');

// @route   GET /api/admin/users
// @desc    Lấy tất cả user (chỉ Admin)
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
    try {
        // Lấy tất cả user, nhưng không trả về trường 'password'
        // .select('-password') có nghĩa là "trừ trường password ra"
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE /api/admin/users/:id
// @desc    Xóa user theo ID (chỉ Admin)
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        
        // Kiểm tra xem admin có tự xóa mình không (không nên)
        // req.user.id là ID của admin đang đăng nhập
        // req.params.id là ID của user sắp bị xóa
        if (req.user.id === req.params.id) {
             return res.status(400).json({ message: 'Không thể tự xóa tài khoản Admin của chính mình' });
        }

        // Xóa user
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'Đã xóa người dùng thành công' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

