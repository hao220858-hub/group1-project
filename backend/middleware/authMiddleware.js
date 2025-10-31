const jwt = require('jsonwebtoken');

/**
 * Middleware để xác thực JWT Token
 */
const authMiddleware = (req, res, next) => {
    // 1. Lấy token từ header (Authorization: "Bearer <token>")
    const authHeader = req.header('Authorization');

    // 2. Kiểm tra xem header có tồn tại không
    if (!authHeader) {
        return res.status(401).json({ message: 'Không tìm thấy token, truy cập bị từ chối' });
    }

    try {
        // 3. Tách chuỗi "Bearer " để lấy token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token không hợp lệ, truy cập bị từ chối' });
        }

        // 4. Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 5. Gắn thông tin user (đã được giải mã) vào request
        // Chúng ta chỉ cần lấy ID từ token mà chúng ta đã tạo ở HĐ 1
        req.userId = decoded.id; 
        
        // 6. Chuyển sang middleware/controller tiếp theo
        next();

    } catch (err) {
        console.error('Lỗi xác thực token:', err.message);
        res.status(401).json({ message: 'Token không hợp lệ' });
    }
};

module.exports = authMiddleware;
