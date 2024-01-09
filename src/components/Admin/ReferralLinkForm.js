import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
import { useHistory } from 'react-router-dom';
import { createReferralLink } from '../../models/referralLinkApi';
import { getInfluencers } from '../../models/Influencer';

const ReferralLinkForm = () => {
  const [link, setLink] = useState('');
  const [influencerId, setInfluencerId] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
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
    const fetchInfluencers = async () => {
      try {
        const response = await getInfluencers();
        setInfluencers(response);
      } catch (error) {
        console.error('Error fetching influencers:', error);
      }
    };

    fetchInfluencers();

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (e) => {
      setSidebarOpen(e.matches);
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

  const handleCreateReferralLink = async () => {
    try {
      setLoading(true);
      await createReferralLink({ link, influencerId });
      setSuccessMessage('Referral link created successfully!');

      // Redirect to the admin dashboard
      history.push('/referral-links');
    } catch (error) {
      console.error('Error creating referral link:', error);
    } finally {
      setLoading(false);
    }
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
        <div className="py-20">
          <main className="flex-1 py-20 overflow-x-hidden overflow-y-auto bg-gray-100">
            <div className="container mx-auto px-4 py-12">
              <h2 className="text-2xl font-semibold mb-4">Create Referral Link</h2>
              <label className="block mb-4">
                <span className="text-gray-700">Link:</span>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="form-input mt-1 block w-full"
                  placeholder="Enter the link that you wanted to track"
                />
              </label>
              <label className="block mb-4">
                <span className="text-gray-700">Influencer:</span>
                <select
                  value={influencerId}
                  onChange={(e) => setInfluencerId(e.target.value)}
                  className="form-select mt-1 block w-full"
                >
                  <option value="">Select Influencer</option>
                  {influencers.map((influencer) => (
                    <option key={influencer.id} value={influencer.id}>
                      {influencer.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleCreateReferralLink}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Link...' : 'Create Referral Link'}
              </button>
              {successMessage && <p className="mt-2 text-green-500">{successMessage}</p>}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinkForm;
