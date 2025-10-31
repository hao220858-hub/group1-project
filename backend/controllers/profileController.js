const User = require('../models/User');

/**
 * Controller để LẤY thông tin cá nhân (Profile)
 */
exports.getProfile = async (req, res) => {
    try {
        // req.userId được cung cấp bởi authMiddleware
        // .select('-password') để không trả về password đã hash
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        
        res.json(user); // Trả về thông tin user

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
};

/**
 * Controller để CẬP NHẬT thông tin cá nhân (Profile)
 */
exports.updateProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        // 1. Tìm user bằng ID từ middleware
        let user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        // 2. Cập nhật thông tin
        user.name = name || user.name; // Nếu name được gửi lên thì cập nhật
        user.email = email || user.email; // Nếu email được gửi lên thì cập nhật

        // (Lưu ý: Chúng ta sẽ xử lý đổi mật khẩu ở Hoạt động 4)
        
        // 3. Lưu lại vào DB
        await user.save();

        // 4. Trả về user đã cập nhật (không có password)
        const userToReturn = user.toObject();
        delete userToReturn.password;

        res.json({ message: 'Cập nhật thông tin thành công', user: userToReturn });

    } catch (err) {
        // Xử lý lỗi nếu email mới bị trùng
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email này đã tồn tại.' });
        }
        console.error(err.message);
        res.status(500).send('Lỗi Server');
    }
};
