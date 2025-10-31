import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// URL API của SV1
const API_URL = "http://localhost:5000/api/auth/login";

// Style cho form (tái sử dụng từ Signup)
const formContainerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  maxWidth: '400px',
  margin: '20px auto',
  background: '#f9f9f9',
  color: '#333',
  textAlign: 'center'
};

const inputStyle = {
  width: 'calc(100% - 20px)',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

const formButtonStyle = {
  width: '100%',
  padding: '10px',
  background: '#28a745', // Màu xanh lá
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

function Login({ onLogin }) { // Nhận hàm onLogin từ App.js
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Dùng để chuyển trang

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!email.trim() || !password.trim()) {
        alert("Vui lòng nhập email và mật khẩu!");
        return;
    }

    try {
      const response = await axios.post(API_URL, {
        email,
        password
      });

      // Lấy token từ response
      const token = response.data.token;
      
      // Sản phẩm nộp: Lưu token [cite: 36-38]
      onLogin(token); // Báo cho App.js biết để lưu

      // Chuyển người dùng sang trang Profile
      navigate('/profile'); 

    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 404)) {
        alert(error.response.data.message); // "Mật khẩu không chính xác" hoặc "Email không tồn tại"
      } else {
        alert("Đăng nhập thất bại!");
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Đăng nhập (Login)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={inputStyle}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            style={inputStyle}
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={formButtonStyle}>Đăng nhập</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
      </p>
    </div>
  );
}

export default Login;

