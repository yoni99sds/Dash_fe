import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAdmins, addAdmin, updateAdmin, deleteAdmin } from '../../models/admin';

function AdminPage() {
  const history = useHistory();
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    id: '',
    name: '',
    username: '',
    password: '',
 
  });
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser] = useState({
    name: 'Admin User',
    profilePicture: '/admin.png',
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/');
  };

  useEffect(() => {
    // Fetch admins from the backend when the component mounts
    fetchAdmins()
      .then((data) => setAdmins(data))
      .catch((error) => console.error('Error fetching admins:', error));

    const mediaQuery = window.matchMedia('(max-width: 768px)');

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
    if (newAdmin.name && newAdmin.username && newAdmin.password) {
     newAdmin.role_id=1;
      addAdmin(newAdmin)
        .then((data) => {
          setAdmins([...admins, data]);
          setNewAdmin({
            id: '',
            name: '',
            username: '',
            password: '',
        
          });
        })
        .catch((error) => {
          console.error('Error adding admin:', error);
        });
    }
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin({ ...admin });
  };

  const handleUpdateAdmin = () => {
    if (editingAdmin) {
      updateAdmin(editingAdmin.id, editingAdmin)
        .then((data) => {
          const updatedAdmins = admins.map((adm) => (adm.id === editingAdmin.id ? data : adm));
          setAdmins(updatedAdmins);
          setEditingAdmin(null);
        })
        .catch((error) => {
          console.error('Error updating admin:', error);
        });
    }
  };

  const handleDeleteAdmin = (adminId) => {
    deleteAdmin(adminId)
      .then(() => {
        const updatedAdmins = admins.filter((adm) => adm.id !== adminId);
        setAdmins(updatedAdmins);
      })
      .catch((error) => {
        console.error('Error deleting admin:', error);
      });
  };

  return (
    <div className="flex">
      {sidebarOpen && <Sidebar isExpanded={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
      <div className={`flex-1 p-10 main-content ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="absolute top-0 right-0 m-4">
          <AdminProfileDropdown user={adminUser} onLogout={handleLogout} />
        </div>
        <button className="block md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
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

        <div className="py-12">
          <h1 className="text-2xl font-semibold mb-4">Admin Management</h1>

          <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
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
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="border border-gray-300 py-2 px-4">
                    {editingAdmin === admin ? (
                        <input
                          type="text"
                          value={editingAdmin.id}
                          onChange={(e) => setEditingAdmin({ ...editingAdmin, id: e.target.value })}
                        />
                      ) : (
                        admin.id
                      )}
                    </td>
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
                          value={editingAdmin.username}
                          onChange={(e) => setEditingAdmin({ ...editingAdmin, username: e.target.value })}
                        />
                      ) : (
                        admin.username
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingAdmin === admin ? (
                        <input
                          type="text"
                          value={editingAdmin.password}
                          onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                        />
                      ) : (
                        admin.password
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
              placeholder="Username"
              value={newAdmin.username}
              onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
             <input
              type="text"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <button onClick={handleAddAdmin} className="bg-green-800 text-white py-2 px-8  rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
