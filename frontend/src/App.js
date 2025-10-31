import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

// API URL (Backend đang chạy ở port 5000)
const API_URL = "http://localhost:5000/api";

//=================================================================
// Component Header (Quản lý Đăng nhập/Đăng xuất)
//=================================================================
function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Đăng xuất thành công!");
    navigate('/login');
  };

  return (
    <header style={{ background: '#333', color: 'white', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        <h2>My App (Buổi 5)</h2>
      </Link>
      <nav>
        {token ? (
          <>
            <Link to="/profile" style={{ color: 'white', marginRight: '10px' }}>Trang cá nhân</Link>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', marginRight: '10px' }}>Đăng nhập</Link>
            <Link to="/signup" style={{ color: 'white' }}>Đăng ký</Link>
          </>
        )}
      </nav>
    </header>
  );
}

//=================================================================
// Component Signup (Đăng ký)
//=================================================================
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/signup`, { name, email, password });
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate('/login');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      alert(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div>
      <h2>Đăng ký (Sign Up)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
    </div>
  );
}

//=================================================================
// Component Login (Đăng nhập)
//=================================================================
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token); // Lưu token
      alert("Đăng nhập thành công!");
      navigate('/profile'); // Chuyển đến trang profile
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      alert(error.response?.data?.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div>
      <h2>Đăng nhập (Login)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <Link to="/signup">Đăng ký ngay</Link></p>
    </div>
  );
}

//=================================================================
// Component Profile (Trang cá nhân - ĐÃ CẬP NHẬT CHO HĐ 2)
//=================================================================
function Profile() {
  const navigate = useNavigate();
  
  // State để lưu thông tin user
  const [user, setUser] = useState(null); 
  
  // State cho form cập nhật
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // State cho thông báo (thành công/thất bại)

  const token = localStorage.getItem('token');

  // 1. Fetch data (GET /profile) khi trang tải
  useEffect(() => {
    // Nếu không có token, đá về trang login
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        // Tạo config (cấu hình) để gửi kèm token
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };
        
        // Gọi API GET /profile (đã được bảo vệ)
        const response = await axios.get(`${API_URL}/profile`, config);
        
        // Lưu thông tin user vào state
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Lỗi khi lấy profile:', error);
        // Nếu token hết hạn hoặc không hợp lệ (lỗi 401)
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token'); // Xóa token hỏng
          navigate('/login'); // Đá về trang login
        }
      }
    };

    fetchProfile();
  }, [token, navigate]); // Chạy lại nếu token hoặc navigate thay đổi

  // 2. Hàm xử lý Cập nhật (PUT /profile)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage(""); // Xóa thông báo cũ

    try {
      const config = {
        headers: { 'Authorization': `Bearer ${token}` }
      };
      
      // Dữ liệu mới cần cập nhật
      const updatedData = { name, email };
      
      // Gọi API PUT /profile
      const response = await axios.put(`${API_URL}/profile`, updatedData, config);
      
      setUser(response.data.user); // Cập nhật state user với data mới
      setMessage("Cập nhật thông tin thành công!"); // Hiển thị thông báo
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      setMessage("Cập nhật thất bại!");
    }
  };

  // Nếu chưa lấy được user (đang tải)
  if (!user) {
    return <div>Đang tải thông tin...</div>;
  }

  // 3. Render (Hiển thị) giao diện
  return (
    <div>
      <h2>Trang cá nhân (Profile)</h2>
      <p>Đây là thông tin của bạn (lấy từ API).</p>
      
      {/* Phần 1: Xem thông tin cá nhân [cite: 50-51] */}
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
        <h3>Xem thông tin</h3>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Tên:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Vai trò:</strong> {user.role}</p>
      </div>

      <hr />

      {/* Phần 2: Cập nhật thông tin [cite: 50-51] */}
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h3>Cập nhật thông tin cá nhân</h3>
        <form onSubmit={handleUpdate}>
          <div>
            <label>Tên:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <button type="submit">Lưu thay đổi</button>
        </form>
        {/* Hiển thị thông báo (nếu có) */}
        {message && <p style={{ color: message.includes('thất bại') ? 'red' : 'green' }}>{message}</p>}
      </div>
    </div>
  );
}

//=================================================================
// Component AppContent (Quản lý routing)
//=================================================================
// Component này bọc AppContent để đảm bảo useNavigate() hoạt động
function AppWrapper() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const token = localStorage.getItem('token');

  return (
    <>
      <Header />
      <div className="container" style={{ padding: '20px' }}>
        <Routes>
          {/* Trang chủ (/) sẽ điều hướng dựa trên token */}
          <Route 
            path="/" 
            element={token ? <Navigate to="/profile" /> : <Navigate to="/login" />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Trang Profile (được bảo vệ) */}
          <Route 
            path="/profile" 
            element={token ? <Profile /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </>
  );
}

//=================================================================
// Component App (Component gốc)
//=================================================================
export default function App() {
  // Chúng ta render AppWrapper thay vì AppContent
  // để BrowserRouter bao bọc mọi thứ
  return (
     <AppWrapper />
  );
}

