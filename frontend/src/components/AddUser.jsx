import React, { useState } from 'react';
import axios from 'axios';

function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Vui lòng nhập tên và email');
      return;
    }
    try {
      const newUser = { name, email };
      // Gửi yêu cầu POST đến backend để tạo user mới
      const response = await axios.post("http://localhost:3000/users", newUser);
      onUserAdded(response.data); // Gửi user mới về App.js
      setName(''); // Xóa trống form
      setEmail('');
    } catch (error) {
      console.error('Lỗi khi thêm user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Thêm User mới</h3>
      <input
        type="text"
        placeholder="Tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Thêm</button>
    </form>
  );
}

export default AddUser;