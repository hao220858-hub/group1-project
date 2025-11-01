const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Lấy token từ header
    const authHeader = req.header('Authorization');

    // Kiểm tra xem có header 'Authorization' không
    if (!authHeader) {
        return res.status(401).json({ message: 'Không có token, không có quyền truy cập' });
    }

    // Header 'Authorization' thường có dạng "Bearer [token]"
    // Tách chữ "Bearer" ra để lấy token
    const token = authHeader.split(' ')[1];

    // Kiểm tra xem có token sau khi tách không
    if (!token) {
        return res.status(401).json({ message: 'Token không hợp lệ (Malformed token)' });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // === THAY ĐỔI QUAN TRỌNG (HĐ 3) ===
        // Gắn toàn bộ thông tin user (bao gồm id và role) vào request
        // thay vì chỉ gắn 'decoded.id' như HĐ 2
        req.user = decoded; 
        // ==================================

        next(); // Đi tiếp
    } catch (err) {
        console.error('Lỗi xác thực token:', err.message);
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = authMiddleware;

