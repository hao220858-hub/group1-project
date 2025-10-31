import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// URL API của SV1
const API_URL = "http://localhost:5000/api/auth/signup";

// Style cho form
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
  background: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Dùng để chuyển trang

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
        alert("Vui lòng nhập đủ thông tin!");
        return;
    }

    try {
      const response = await axios.post(API_URL, {
        name,
        email,
        password
      });

      // Sản phẩm nộp: Thông báo kết quả [cite: 36-38]
      alert(response.data.message); // "Đăng ký thành công!"
      
      // Chuyển người dùng sang trang Đăng nhập
      navigate('/login'); 

    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message); // "Email đã tồn tại."
      } else {
        alert("Đăng ký thất bại!");
      }
    }
  };

  return (
    <div style={formContainerStyle}>
      <h2>Đăng ký (Sign Up)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={inputStyle}
            type="text"
            placeholder="Tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type="submit" style={formButtonStyle}>Đăng ký</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
      </p>
    </div>
  );
}

export default Signup;

