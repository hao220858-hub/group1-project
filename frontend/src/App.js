
// DAY LA DONG TEST DE KIEM TRA GIT
import React, { useState, useEffect } from 'react';
// ... (phần còn lại của file)import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Đảm bảo bạn đã chạy npm install axios

// URL của backend server (Sinh viên 1)
const API_URL = "http://localhost:5000/users";

function App() {
  // State để lưu danh sách users
  const [users, setUsers] = useState([]);
  
  // State cho form
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // State để biết đang sửa user nào. null = Thêm mới, object = Cập nhật
  const [editingUser, setEditingUser] = useState(null);

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

  // 3. Hàm xử lý khi nhấn nút "Thêm" (POST API) hoặc "Lưu Cập nhật" (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload lại trang

    // === BẮT ĐẦU SỬA (HOẠT ĐỘNG 8) ===
    // 1. Kiểm tra Tên (Name) không được để trống [cite: 172-174]
    if (!newName.trim()) {
      alert("Name không được để trống");
      return; // Dừng hàm
    }
    
    // 2. Kiểm tra Email có đúng định dạng (Regex) không [cite: 175-177]
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      alert("Email không hợp lệ");
      return; // Dừng hàm
    }
    // === KẾT THÚC SỬA (HOẠT ĐỘNG 8) ===

    // Kiểm tra xem đang ở chế độ Sửa hay Thêm
    if (editingUser) {
      // Đang ở chế độ Sửa (PUT)
      try {
        const updatedData = { name: newName, email: newEmail };
        const response = await axios.put(`${API_URL}/${editingUser._id}`, updatedData);

        // Cập nhật lại user trong danh sách (state)
        setUsers(users.map(user => 
          user._id === editingUser._id ? response.data.user : user
        ));

        // Reset form về trạng thái "Thêm mới"
        setEditingUser(null);
        setNewName("");
        setNewEmail("");
      } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
        alert("Cập nhật user thất bại!");
      }
    } else {
      // Đang ở chế độ Thêm mới (POST)
      try {
        const newUser = { name: newName, email: newEmail };
        const response = await axios.post(API_URL, newUser);
        
        setUsers([...users, response.data.user]); 
        
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
    }
  };
  // ===============================

  // 4. Hàm Xóa user (DELETE)
  const handleDelete = async (userId) => {
    // Hỏi xác nhận
    if (window.confirm("Bạn có chắc chắn muốn xóa user này?")) {
      try {
        await axios.delete(`${API_URL}/${userId}`);
        
        // Cập nhật lại UI bằng cách lọc user đã xóa ra khỏi state
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        alert("Xóa user thất bại!");
      }
    }
  };

  // 5. Hàm bắt đầu Sửa (nhấn nút "Sửa")
  const handleEditClick = (user) => {
    setEditingUser(user); // Lưu user đang sửa vào state
    setNewName(user.name); // Điền tên user vào form
    setNewEmail(user.email); // Điền email user vào form
  };

  // 6. Hàm Hủy Sửa
  const handleCancelEdit = () => {
    setEditingUser(null);
    setNewName("");
    setNewEmail("");
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {/* Sửa tiêu đề form tùy theo đang Sửa hay Thêm */}
        <h1>{editingUser ? "Cập nhật User" : "Quản lý User"}</h1>

        {/* Form thêm/sửa User */}
        <form onSubmit={handleSubmit}>
          {/* Sửa tiêu đề form tùy theo đang Sửa hay Thêm */}
          <h2>{editingUser ? "Sửa thông tin" : "Thêm User mới"}</h2>
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
          {/* Sửa nút submit tùy theo đang Sửa hay Thêm */}
          <button type="submit">{editingUser ? "Lưu Cập nhật" : "Thêm"}</button>
          
          {/* Nếu đang sửa thì hiện nút Hủy */}
          {editingUser && (
            <button type="button" onClick={handleCancelEdit}>
              Hủy
            </button>
          )}
        </form>

        {/* Danh sách Users (Hoạt động 6) */}
        <h2>Danh sách Users (từ MongoDB)</h2>
        <div className="user-list">
          {users.length > 0 ? (
            users.map(user => (
              <div key={user._id} className="user-item">
                <p><strong>Tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                
                {/* === THÊM NÚT SỬA/XÓA (HĐ 7) === */}
                <button onClick={() => handleEditClick(user)}>Sửa</button>
                <button onClick={() => handleDelete(user._id)}>Xóa</button>
                {/* ================================= */}

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

