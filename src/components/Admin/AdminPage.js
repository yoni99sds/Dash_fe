import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function AdminPage() {
  const history = useHistory();
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin 1', email: 'admin1@example.com', password: 'Password1' },
    { id: 2, name: 'Admin 2', email: 'admin2@example.com', password: 'Password2' },

  ]);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [adminUser] = useState({
    name: 'Admin User',
    profilePicture: '/admin.png', 
  });
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    // Then, redirect to the login page
  
    history.push('/');
  };

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px');

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

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

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      const newId = Math.max(...admins.map((admin) => admin.id), 0) + 1;
      setAdmins([
        ...admins,
        {
          id: newId,
          ...newAdmin,
        },
      ]);
      setNewAdmin({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
  };

  const handleUpdateAdmin = () => {
    if (editingAdmin) {
      const updatedAdmins = admins.map((admin) =>
        admin.id === editingAdmin.id ? editingAdmin : admin
      );
      setAdmins(updatedAdmins);
      setEditingAdmin(null);
    }
  };

  const handleDeleteAdmin = (adminId) => {
    const updatedAdmins = admins.filter((admin) => admin.id !== adminId);
    setAdmins(updatedAdmins);
  };

  return (
    <div className="flex ">
      {sidebarOpen && <Sidebar isExpanded={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
      <div className={`flex-1 p-10 main-content ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="absolute top-0 right-0 m-4">
      <AdminProfileDropdown user={adminUser} onLogout={handleLogout} />
</div>
        <button className="block md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 m-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 m-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="py-12">
          <h1 className="text-2xl font-semibold mb-4">Admin Management</h1>

          <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 py-2 px-4">Id</th>
                  <th className="border border-gray-300 py-2 px-4">Name</th>
                  <th className="border border-gray-300 py-2 px-4">Email</th>
                  <th className="border border-gray-300 py-2 px-4">Password</th>
                  <th className="border border-gray-300 py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="border border-gray-300 py-2 px-4">{admin.id}</td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingAdmin === admin ? (
                        <input
                          type="text"
                          value={editingAdmin.name}
                          onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                        />
                      ) : (
                        admin.name
                      )}
                    </td>

                    <td className="border border-gray-300 py-2 px-4">
                      {editingAdmin === admin ? (
                        <input
                          type="text"
                          value={editingAdmin.email}
                          onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                        />
                      ) : (
                        admin.email
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingAdmin === admin ? (
                        <input
                          type="text"
                          value={editingAdmin.password || ''}
                          onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                        />
                      ) : (
                        admin.password || 'N/A'
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingAdmin === admin ? (
                        <button onClick={handleUpdateAdmin} className="text-blue-600 hover:underline">
                          Save
                        </button>
                      ) : (
                        <>
                          <button onClick={() => handleEditAdmin(admin)} className="text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteAdmin(admin.id)} className="text-red-600 hover:underline">
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

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Add Admin</h2>
            <input
              type="text"
              placeholder="Name"
              value={newAdmin.name}
              onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Password"
              value={newAdmin.password || ''}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <button onClick={handleAddAdmin} className="bg-green-800 text-white py-2 px-8 rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
