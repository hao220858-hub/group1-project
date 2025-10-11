import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  // Hàm để lấy danh sách user từ backend
  const fetchUsers = async () => {
    try {
      // Gửi yêu cầu GET đến backend để lấy danh sách user từ MongoDB
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách user:', error);
    }
  };

  // useEffect sẽ chạy một lần khi component được render lần đầu
  useEffect(() => {
    fetchUsers();
  }, []);

  // Hàm để cập nhật danh sách user sau khi thêm thành công
  const handleUserAdded = (newUser) => {
    // Sau khi thêm user mới, gọi lại hàm fetchUsers để cập nhật danh sách từ database
    fetchUsers();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Quản lý User</h1>
        <AddUser onUserAdded={handleUserAdded} />
        <UserList users={users} />
      </header>
    </div>
  );
}

export default App;