// Middleware này dùng để kiểm tra xem user có phải là Admin không
// Nó sẽ chạy SAU khi authMiddleware chạy

const adminMiddleware = (req, res, next) => {
    // authMiddleware đã chạy trước và gắn req.user
    
    // Kiểm tra xem req.user có tồn tại và role có phải là 'admin' không
    if (req.user && req.user.role === 'admin') {
        next(); // Là admin, cho đi tiếp
    } else {
        // Không phải admin
        res.status(403).json({ message: 'Yêu cầu quyền Admin!' });
    }
};

module.exports = adminMiddleware;

