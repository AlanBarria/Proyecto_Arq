import { User } from '../models/userModel';
import { fetchUsers, createUser } from '../api/userApi';

export const getAllUsers = async () => {
  const usersData = await fetchUsers();
  return usersData.map(user => new User(user.id, user.name, user.email));
};

export const addUser = async (name, email) => {
  const newUser = new User(Date.now(), name, email); // ID autoincremental simple
  const createdUser = await createUser(newUser);
  return new User(createdUser.id, createdUser.name, createdUser.email);
};
