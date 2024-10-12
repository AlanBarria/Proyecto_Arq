const API_URL = 'https://your-api-url.com/users';

export const fetchUsers = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};
