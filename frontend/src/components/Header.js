import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Style đơn giản cho Header
const headerStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'Arial, sans-serif'
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  margin: '0 10px'
};

const buttonStyle = {
  background: 'none',
  border: '1px solid #fff',
  color: '#fff',
  padding: '5px 10px',
  cursor: 'pointer',
  fontFamily: 'Arial, sans-serif'
};

function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); // Gọi hàm logout từ App.js
    navigate('/login'); // Chuyển về trang login
  };

  return (
    <nav style={headerStyle}>
      <Link to="/" style={linkStyle}>
        <h2>My App (Buổi 5)</h2>
      </Link>
      <div>
        {isLoggedIn ? (
          // Nếu đã đăng nhập
          <>
            <Link to="/profile" style={linkStyle}>Trang cá nhân</Link>
            <button onClick={handleLogoutClick} style={buttonStyle}>
              Đăng xuất
            </button>
          </>
        ) : (
          // Nếu chưa đăng nhập
          <>
            <Link to="/login" style={linkStyle}>Đăng nhập</Link>
            <Link to="/signup" style={linkStyle}>Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;

