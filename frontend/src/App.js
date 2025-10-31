import React, { useState, useEffect } from 'react';
// Import các hook của React Router
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
// Import axios để gọi API
import axios from 'axios';

// +---------------------------------------------------+
// |             FILE NÀY GỘP TẤT CẢ CODE              |
// |   (App.js, Header.js, Signup.js, Login.js)        |
// +---------------------------------------------------+

// ===================================================
// START: Code cho components/Header.js
// ===================================================

// Style đơn giản cho Header (JS object)
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

/**
 * Component Header
 * Hiển thị thanh điều hướng
 */
function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate(); // Hook này cần context từ <BrowserRouter>

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
// ===================================================
// END: Code cho components/Header.js
// ===================================================


// ===================================================
// START: Code cho components/Signup.js
// ===================================================

// URL API của SV1
const API_SIGNUP_URL = "http://localhost:5000/api/auth/signup";

// Style cho form (JS object)
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

/**
 * Component Signup
 * Form đăng ký tài khoản
 */
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook này cần context từ <BrowserRouter>

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
        alert("Vui lòng nhập đủ thông tin!");
        return;
    }

    try {
      // Gọi API Signup
      const response = await axios.post(API_SIGNUP_URL, {
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
// ===================================================
// END: Code cho components/Signup.js
// ===================================================


// ===================================================
// START: Code cho components/Login.js
// ===================================================

// URL API của SV1
const API_LOGIN_URL = "http://localhost:5000/api/auth/login";

// Style cho nút Login
const loginFormButtonStyle = {
  ...formButtonStyle, // Kế thừa style từ nút signup
  background: '#28a745', // Màu xanh lá
};

/**
 * Component Login
 * Form đăng nhập
 */
function Login({ onLogin }) { // Nhận hàm onLogin từ App.js
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook này cần context từ <BrowserRouter>

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!email.trim() || !password.trim()) {
        alert("Vui lòng nhập email và mật khẩu!");
        return;
    }

    try {
      // Gọi API Login
      const response = await axios.post(API_LOGIN_URL, {
        email,
        password
      });

      // Lấy token từ response
      const token = response.data.token;
      
      // Sản phẩm nộp: Lưu token [cite: 36-38]
      onLogin(token); // Báo cho App.js biết để lưu (gọi hàm handleLogin)

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
        <button type="submit" style={loginFormButtonStyle}>Đăng nhập</button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link>
      </p>
    </div>
  );
}
// ===================================================
// END: Code cho components/Login.js
// ===================================================


// ===================================================
// START: Component Profile tạm thời
// ===================================================
/**
 * Component Profile Tạm thời
 * (Sẽ được nâng cấp ở Hoạt động 2)
 */
const Profile = () => {
  // Style cho component tạm
  const profileStyle = {
    ...formContainerStyle, // Kế thừa style
    background: '#e6f7ff',
    textAlign: 'center'
  };
  return (
    <div style={profileStyle}>
      <h2>Trang cá nhân</h2>
      <p>Bạn đã đăng nhập thành công!</p>
      <p>(Đây là trang Profile, sẽ được nâng cấp ở Hoạt động 2).</p>
    </div>
  );
};
// ===================================================
// END: Component Profile tạm thời
// ===================================================


// ===================================================
// START: Component AppContent (ĐỂ SỬA LỖI)
// Component này chứa toàn bộ logic và UI của app
// ===================================================
function AppContent() {
  // State để biết user đã đăng nhập hay chưa
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra token trong localStorage khi app tải lần đầu
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Hàm xử lý khi đăng nhập thành công (được gọi từ Login.js)
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // Hàm xử lý khi đăng xuất (được gọi từ Header.js)
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // Style cho App container
  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  };

  return (
    <> {/* Dùng Fragment thay cho div */}
      {/* Header sẽ hiển thị trên mọi trang */}
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div style={appStyle}>
        <Routes>
          {/* Trang Đăng ký */}
          <Route 
            path="/signup" 
            element={<Signup />} 
          />
          
          {/* Trang Đăng nhập */}
          <Route 
            path="/login" 
            // Nếu đã login, tự chuyển sang /profile. Nếu chưa, hiện form Login.
            element={isLoggedIn ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />} 
          />
          
          {/* Trang Profile (Cần đăng nhập) */}
          <Route 
            path="/profile" 
            // Nếu chưa login, tự chuyển về /login.
            element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} 
          />
          
          {/* Trang chủ ("/") */}
          <Route 
            path="/"
            // Tự động chuyển đến /profile (nếu đã login) hoặc /login (nếu chưa)
            element={isLoggedIn ? <Navigate to="/profile" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}
// ===================================================
// END: Component AppContent
// ===================================================


// ===================================================
// START: Component APP chính
// (Bọc AppContent trong BrowserRouter)
// ===================================================
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
// ===================================================
// END: Component APP chính
// ===================================================

