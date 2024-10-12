import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
};

export default UserList;
