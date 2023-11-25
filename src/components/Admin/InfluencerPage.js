import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchInfluencers, addInfluencer, deleteInfluencer, updateInfluencer } from '../../models/Influencer';
function InfluencerPage() {
  const history = useHistory();
  const [influencers, setInfluencers] = useState([]);
  const [newInfluencer, setNewInfluencer] = useState({
    id: '',
    name: '',
    username: '',
    password: '',
    referral_link: '',
    promo_codes: '',
    created_at: '',
    updated_at: '',
  });
  const [editingInfluencer, setEditingInfluencer] = useState(null);
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
    // Fetch influencers from the backend when the component mounts
    fetchInfluencers()
      .then((data) => setInfluencers(data))
      .catch((error) => console.error('Error fetching influencers:', error));

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

  const handleAddInfluencer = () => {
    if (newInfluencer.name && newInfluencer.referral_link) {
      // Set the role_id to 2 for influencers
      newInfluencer.role_id = 2;

      addInfluencer(newInfluencer)
        .then((data) => {
          setInfluencers([...influencers, data]);
          setNewInfluencer({
            id: '',
            name: '',
            username: '',
            password: '',
            referral_link: '',
            promo_codes: '',
            created_at: '',
            updated_at: '',
          });
        })
        .catch((error) => {
          console.error('Error adding influencer:', error);
        });
    }
  };
  const handleEditInfluencer = (influencer) => {
    setEditingInfluencer({ ...influencer });
  };

  const handleUpdateInfluencer = () => {
    if (editingInfluencer) {
      updateInfluencer(editingInfluencer.id, editingInfluencer)
        .then((data) => {
          const updatedInfluencers = influencers.map((inf) => (inf.id === editingInfluencer.id ? data : inf));
          setInfluencers(updatedInfluencers);
          setEditingInfluencer(null);
        })
        .catch((error) => {
          console.error('Error updating influencer:', error);
        });
    }
  };

  const handleDeleteInfluencer = (influencerId) => {
    deleteInfluencer(influencerId)
      .then(() => {
        const updatedInfluencers = influencers.filter((inf) => inf.id !== influencerId);
        setInfluencers(updatedInfluencers);
      })
      .catch((error) => {
        console.error('Error deleting influencer:', error);
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
          <h1 className="text-2xl font-semibold mb-4">Influencer Management</h1>

          <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 py-2 px-4">Id</th>
                <th className="border border-gray-300 py-2 px-4">Name</th>
                <th className="border border-gray-300 py-2 px-4">Username</th>
                <th className="border border-gray-300 py-2 px-4">Password</th>
                <th className="border border-gray-300 py-2 px-4">Referral Link</th>
                <th className="border border-gray-300 py-2 px-4">Promo Code</th>
                <th className="border border-gray-300 py-2 px-4">Created At</th>
                <th className="border border-gray-300 py-2 px-4">Updated At</th>
                <th className="border border-gray-300 py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
                {influencers.map((influencer) => (
                  <tr key={influencer.id}>
                    <td className="border border-gray-300 py-2 px-4">
                    {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.id}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, id: e.target.value })}
                        />
                      ) : (
                        influencer.id
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.name}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, name: e.target.value })}
                        />
                      ) : (
                        influencer.name
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.username}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, username: e.target.value })}
                        />
                      ) : (
                        influencer.username
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.password}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, password: e.target.value })}
                        />
                      ) : (
                        influencer.password
                      )}
                    </td>

                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.referralLink}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, referral_link: e.target.value })}
                        />
                      ) : (
                        influencer.referral_link
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.promo_codes}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, promo_codes: e.target.value })}
                        />
                      ) : (
                        influencer.promo_codes 
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.created_at}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, created_at: e.target.value })}
                        />
                      ) : (
                        influencer.created_at
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.updated_at}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, updated_at: e.target.value })}
                        />
                      ) : (
                        influencer.updated_at
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <button onClick={handleUpdateInfluencer} className="text-blue-600 hover:underline">
                          Save
                        </button>
                      ) : (
                        <>
                          <button onClick={() => handleEditInfluencer(influencer)} className="text-blue-600 hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteInfluencer(influencer.id)} className="text-red-600 hover:underline">
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
            <h2 className="text-xl font-semibold mb-2">Add Influencer</h2>
            <input
              type="text"
              placeholder="Name"
              value={newInfluencer.name}
              onChange={(e) => setNewInfluencer({ ...newInfluencer, name: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
             <input
              type="text"
              placeholder="Username"
              value={newInfluencer.username}
              onChange={(e) => setNewInfluencer({ ...newInfluencer, username: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
             <input
              type="text"
              placeholder="Password"
              value={newInfluencer.password}
              onChange={(e) => setNewInfluencer({ ...newInfluencer, password: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Referral Link" 
              value={newInfluencer.referral_link}
              onChange={(e) => setNewInfluencer({ ...newInfluencer, referral_link: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Promo Code"
              value={newInfluencer.promo_codes}
              onChange={(e) => setNewInfluencer({ ...newInfluencer, promo_codes: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <button onClick={handleAddInfluencer} className="bg-green-800 text-white py-2 px-8  rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerPage;
