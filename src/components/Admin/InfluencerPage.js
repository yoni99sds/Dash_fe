import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function InfluencerPage() {
  const history = useHistory();
  const [influencers, setInfluencers] = useState([
    { id: 1, name: 'Influencer 1', referralCode: 'REF123', promoCode: 'PROMO456' },
    { id: 2, name: 'Influencer 2', referralCode: 'REF456', promoCode: 'PROMO789' },
    // Add more sample data
  ]);
  const [newInfluencer, setNewInfluencer] = useState({
    name: '',
    referralCode: '',
    promoCode: '',
  });

  const [editingInfluencer, setEditingInfluencer] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the max-width as needed

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setSidebarOpen(false); // Close sidebar in mobile view
      } else {
        setSidebarOpen(true); // Open sidebar in larger screens
      }
    };

    // Add event listener to handle media query changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Initial check of media query and set sidebar state accordingly
    if (mediaQuery.matches) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const handleAddInfluencer = () => {
    // Add a new influencer
    if (newInfluencer.name && newInfluencer.referralCode) {
      setInfluencers([...influencers, newInfluencer]);
      setNewInfluencer({
        name: '',
        referralCode: '',
        promoCode: '',
      });
    }
  };

  const handleEditInfluencer = (influencer) => {
    // Set the influencer to be edited
    setEditingInfluencer(influencer);
  };

  const handleUpdateInfluencer = () => {
    // Update the influencer
    if (editingInfluencer) {
      const updatedInfluencers = influencers.map((influencer) =>
        influencer.id === editingInfluencer.id ? editingInfluencer : influencer
      );
      setInfluencers(updatedInfluencers);
      setEditingInfluencer(null);
    }
  };

  const handleDeleteInfluencer = (influencerId) => {
    // Delete the influencer
    const updatedInfluencers = influencers.filter((influencer) => influencer.id !== influencerId);
    setInfluencers(updatedInfluencers);
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
          <h1 className="text-2xl font-semibold mb-4">Influencer Management</h1>

          <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 py-2 px-4">Id</th>
                  <th className="border border-gray-300 py-2 px-4">Name</th>
                  <th className="border border-gray-300 py-2 px-4">Referral Code</th>
                  <th className="border border-gray-300 py-2 px-4">Promo Code</th>
                  <th className="border border-gray-300 py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {influencers.map((influencer) => (
                  <tr key={influencer.id}>
                    <td className="border border-gray-300 py-2 px-4"></td>
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
                          value={editingInfluencer.referralCode}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, referralCode: e.target.value })}
                        />
                      ) : (
                        influencer.referralCode
                      )}
                    </td>
                    <td className="border border-gray-300 py-2 px-4">
                      {editingInfluencer === influencer ? (
                        <input
                          type="text"
                          value={editingInfluencer.promoCode || ''}
                          onChange={(e) => setEditingInfluencer({ ...editingInfluencer, promoCode: e.target.value })}
                        />
                      ) : (
                        influencer.promoCode || 'N/A'
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
              placeholder="Referral Code"
              value={newInfluencer.referralCode}
              onChange={(e) => setNewInfluencer({ ...newInfluencer, referralCode: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Promo Code"
              value={newInfluencer.promoCode || ''}
              onChange={(e) => setNewInfluencer({ ...newInfluencer, promoCode: e.target.value })}
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
