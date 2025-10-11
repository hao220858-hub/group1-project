import React from 'react';

function UserList({ users }) {
  return (
    <div>
      <h3>Danh sách Users</h3>
      <ul>
        {users.map(user => (
          // Sử dụng _id từ MongoDB hoặc id từ mảng tạm
          <li key={user.id || user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;