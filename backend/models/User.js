const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    // === THÊM MỚI (HĐ 1 - SV3) ===
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }
    // =============================
}, { timestamps: true }); // Thêm timestamps để biết khi nào user được tạo

// === THÊM MỚI (HĐ 1 - SV3) ===
// Tự động băm (hash) mật khẩu trước khi lưu
UserSchema.pre('save', async function(next) {
    // Chỉ hash mật khẩu nếu nó được sửa (hoặc là user mới)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Tạo "muối" (salt) để tăng bảo mật
        const salt = await bcrypt.genSalt(10);
        // Băm mật khẩu với salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});
// =============================

module.exports = mongoose.model('User', UserSchema);
