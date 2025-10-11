// Tạo một mảng tạm để lưu trữ dữ liệu người dùng
let users = [];
let currentId = 1;

// API lấy danh sách người dùng
exports.getUsers = (req, res) => {
    res.json(users);
};

// API tạo người dùng mới
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: currentId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};