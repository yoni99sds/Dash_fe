import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { addUser, fetchUsers, updateUser, deleteUser } from '../../models/User';

function UserPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setIsLoading(false);
      });

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    if (mediaQuery.matches) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.username && newUser.password) {

      newUser.role_id = 3;
      addUser(newUser)
        .then((data) => {
          setUsers([...users, data]);
          setNewUser({
            name: '',
            username: '',
            password: '',
          });
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      updateUser(editingUser)
        .then(() => {
          const updatedUsers = users.map((user) => (user.id === editingUser.id ? editingUser : user));
          setUsers(updatedUsers);
          setEditingUser(null);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    }
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };



  return (
    <div className="flex">
      {sidebarOpen && <Sidebar isExpanded={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
      <div className={`flex-1 p-10 main-content ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Sidebar toggle button */}
        <button className="block md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* User Management section */}
        <div className="py-12">
          <h1 className="text-2xl font-semibold mb-4">User Management</h1>

          {/* Loading or user data */}
          {isLoading ? (
            <p>Loading user data...</p>
          ) : (
            <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
              {/* User table */}
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 py-2 px-4">Id</th>
                    <th className="border border-gray-300 py-2 px-4">Name</th>
                    <th className="border border-gray-300 py-2 px-4">Username</th>
                    <th className="border border-gray-300 py-2 px-4">Password</th>
                    <th className="border border-gray-300 py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* User rows */}
                  {users && Array.isArray(users) ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td className="border border-gray-300 py-2 px-4">{user.id}</td>
                        <td className="border border-gray-300 py-2 px-4">
                          {editingUser && editingUser.id === user.id ? (
                            <input
                              type="text"
                              value={editingUser.name}
                              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                            />
                          ) : (
                            user.name
                          )}
                        </td>
                        <td className="border border-gray-300 py-2 px-4">
                          {editingUser && editingUser.id === user.id ? (
                            <input
                              type="text"
                              value={editingUser.username}
                              onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                            />
                          ) : (
                            user.username
                          )}
                        </td>
                        <td className="border border-gray-300 py-2 px-4">
                          {editingUser && editingUser.id === user.id ? (
                            <input
                              type="text"
                              value={editingUser.password}
                              onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                            />
                          ) : (
                            user.password
                          )}
                        </td>
                        <td className="border border-gray-300 py-2 px-4">
                          {editingUser && editingUser.id === user.id ? (
                            <button onClick={handleUpdateUser} className="text-blue-600 hover:underline">
                              Save
                            </button>
                          ) : (
                            <>
                              <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:underline">
                                Edit
                              </button>
                              <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:underline">
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No user data available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Add User section */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Add User</h2>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <button onClick={handleAddUser} className="bg-green-800 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserPage;
