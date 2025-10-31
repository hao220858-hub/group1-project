const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// === BẮT ĐẦU (HĐ 1 - SV1) ===

// 1. Đăng ký (Sign Up)
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email đã tồn tại." });
        }

        // Tạo user mới (mật khẩu sẽ tự động được băm bởi logic trong User.js)
        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({ message: "Đăng ký thành công!" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// 2. Đăng nhập (Login)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Tìm user bằng email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại." });
        }

        // 2. So sánh mật khẩu đã băm
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Mật khẩu không chính xác." });
        }

        // 3. Tạo JWT Token
        // (Hãy thêm JWT_SECRET vào file .env của bạn)
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_default_secret_key', // Luôn dùng .env trong thực tế
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: "Đăng nhập thành công!",
            token: token,
            userId: user._id,
            role: user.role
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

// 3. Đăng xuất (Logout)
// Thường xử lý ở client bằng cách xóa token. Backend chỉ cần 1 endpoint để xác nhận.
exports.logout = (req, res) => {
    // (Trong thực tế có thể thêm token vào blacklist nếu dùng CSDL)
    res.status(200).json({ message: "Đăng xuất thành công." });
};

// === KẾT THÚC (HĐ 1 - SV1) ===
