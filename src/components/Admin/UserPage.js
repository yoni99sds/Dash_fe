import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AdminProfileDropdown from './AdminProfileDropdown';
function UserPage() {
    const history = useHistory();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [editingUser, setEditingUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [adminUser] = useState({
    name: 'Admin User',
    profilePicture: '/admin.png', 
  });
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    // Then, redirect to the login page
  
    history.push('/');
  };
  useEffect(() => {
    // In a real application, this data would come from a server.

    const mockUsers = [
      { id: 1, fullName: 'Yonas', email: 'yonas@example.com', password: 'password123' },
      { id: 2, fullName: 'Jo', email: 'Jo@example.com', password: 'password2' },
    ];

    const handleMediaQueryChange = (e) => {
        if (e.matches) {
          setSidebarOpen(false); // Close sidebar in mobile view
        } else {
          setSidebarOpen(true); // Open sidebar in larger screens
        }
      };
      const mediaQuery = window.matchMedia('(max-width: 768px)'); 
      // Add event listener to handle media query changes
      mediaQuery.addEventListener('change', handleMediaQueryChange);
  
      // Initial check of media query and set sidebar state accordingly
      if (mediaQuery.matches) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
  
    setUsers(mockUsers);
    setIsLoading(false);


  }, []);

  const handleAddUser = () => {
    if (newUser.fullName && newUser.email && newUser.password) {
    
      // For now, we'll create a mock user with a random ID.
      const randomId = Math.floor(Math.random() * 1000);
      setUsers([
        ...users,
        { id: randomId, ...newUser },
      ]);

      setNewUser({
        fullName: '',
        email: '',
        password: '',
      });
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? editingUser : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="flex">
      {sidebarOpen && <Sidebar isExpanded={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
      <div className={`flex-1 p-10 main-content ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="absolute top-0 right-0 m-4">
      <AdminProfileDropdown user={adminUser} onLogout={handleLogout} />
</div>
      <button className="block md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? (
            // Use a different icon for when the sidebar is open
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Use a different icon for when the sidebar is closed
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="py-12">
          <h1 className="text-2xl font-semibold mb-4">User Management</h1>

          {isLoading ? (
            <p>Loading user data...</p>
          ) : (
            <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 py-2 px-4">Id</th>
                    <th className="border border-gray-300 py-2 px-4">Full Name</th>
                    <th className="border border-gray-300 py-2 px-4">Email</th>
                    <th className="border border-gray-300 py-2 px-4">Password</th>
                    <th className="border border-gray-300 py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="border border-gray-300 py-2 px-4">{user.id}</td>
                      <td className="border border-gray-300 py-2 px-4">
                        {editingUser === user ? (
                          <input
                            type="text"
                            value={editingUser.fullName}
                            onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
                          />
                        ) : (
                          user.fullName
                        )}
                      </td>
                      <td className="border border-gray-300 py-2 px-4">
                        {editingUser === user ? (
                          <input
                            type="text"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="border border-gray-300 py-2 px-4">
                        {editingUser === user ? (
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
                        {editingUser === user ? (
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
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Add User</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
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
