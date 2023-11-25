const API_BASE_URL = '/api';

async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  return response.json();
}

async function addUser(newUser) {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });
  return response.json();
}

async function updateUser(editedUser) {
  const response = await fetch(`${API_BASE_URL}/users/${editedUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedUser),
  });
  return response.json();
}

async function deleteUser(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });
  return response.json();
}

export { fetchUsers, addUser, updateUser, deleteUser };
