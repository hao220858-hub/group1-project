import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Đảm bảo bạn đã chạy npm install axios
import './App.css';

// URL của backend server (Sinh viên 1)
const API_URL = "http://localhost:5000/users";

function App() {
  // State để lưu danh sách users
  const [users, setUsers] = useState([]);
  
  // State cho form thêm user mới
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // 1. Dùng useEffect để gọi API khi component tải lần đầu
  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. Hàm gọi API GET để lấy danh sách user
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data); // Lưu data vào state
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
    }
  };

  // 3. Hàm xử lý khi nhấn nút "Thêm" (POST API)
  const handleAddUser = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang
    if (!newName.trim() || !newEmail.trim()) {
      alert("Vui lòng nhập đủ tên và email");
      return;
    }

    try {
      const newUser = { name: newName, email: newEmail };
      const response = await axios.post(API_URL, newUser);
      
      // Thêm user mới vào danh sách (state) mà không cần reload
      setUsers([...users, response.data.user]); 
      
      // Xóa trắng form
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
      if (error.response && error.response.status === 409) {
        alert("Email này đã tồn tại!"); // Xử lý lỗi 409 từ backend
      } else {
        alert("Thêm user thất bại!");
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản lý User</h1>

        {/* Form thêm User (Hoạt động 4) */}
        <form onSubmit={handleAddUser}>
          <h2>Thêm User mới</h2>
          <input
            type="text"
            placeholder="Tên"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button type="submit">Thêm</button>
        </form>

        {/* Danh sách Users (Hoạt động 6) */}
        <h2>Danh sách Users (từ MongoDB)</h2>
        <div className="user-list">
          {users.length > 0 ? (
            users.map(user => (
              <div key={user._id} className="user-item">
                <p><strong>Tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
            ))
          ) : (
            <p>Không có user nào để hiển thị.</p>
          )}
        </div>

      </header>
    </div>
  );
}

export default App;