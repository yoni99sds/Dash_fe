import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
import { useHistory } from 'react-router-dom';
import { createPromoCode } from '../../models/PromoCodeApi';
import { getInfluencers } from '../../models/Influencer';
import { getReferralLinks } from '../../models/referralLinkApi';

const PromoCodeForm = () => {
  const [code, setCode] = useState('');
  const [referralLinkId, setReferralLinkId] = useState('');
  const [influencerId, setInfluencerId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [filteredReferralLinks, setFilteredReferralLinks] = useState([]);
  const [referralLinks, setReferralLinks] = useState([]);
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
    const fetchData = async () => {
      try {
        const [influencersResponse, referralLinksResponse] = await Promise.all([
          getInfluencers(),
          getReferralLinks(),
        ]);

        setInfluencers(influencersResponse);
        setReferralLinks(referralLinksResponse);

        // Set the default influencerId to an empty string
        setInfluencerId('');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

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

  const handleCreatePromoCode = async () => {
    try {
      setLoading(true);

      const selectedReferralLink = referralLinks.find((link) => link.id === parseInt(referralLinkId, 10));

      if (!selectedReferralLink) {
        console.error('Selected referral link not found');
        return;
      }

      const referralLink = selectedReferralLink.link;

      await createPromoCode({ code, referralLinkId, influencerId, referralLink });
      setSuccessMessage('Promo code created successfully!');

      // Clear form fields  
      setCode('');
      setReferralLinkId('');
      setInfluencerId('');
      history.push('/promo-codes-list');
    } catch (error) {
      console.error('Error creating promo code:', error);
      // Handle error (e.g., display an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  const handleInfluencerChange = (selectedInfluencerId) => {
    // Filter referral links based on selected influencer
    const influencerReferralLinks = referralLinks.filter(
      (link) => link.InfluencersId === parseInt(selectedInfluencerId, 10)
    );
    setFilteredReferralLinks(influencerReferralLinks);

    // Set the selected influencerId
    setInfluencerId(selectedInfluencerId);
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
          <h2 className="text-2xl font-semibold mb-4">Create Promo Code</h2>

          <label className="block mb-4">
            Code:
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="form-input mt-1 block w-full" />
          </label>
          <label className="block mb-4">
            Referral Link:
            <select
              value={referralLinkId}
              onChange={(e) => setReferralLinkId(e.target.value)}
              className="form-select mt-1 block w-full"
            >
              <option value="">Select Referral Link</option>
              {filteredReferralLinks.map((link) => (
                <option key={link.id} value={link.id}>
                  {link.link}
                </option>
              ))}
            </select>
          </label>
          <label className="block mb-4">
            Influencer:
            <select value={influencerId} onChange={(e) => handleInfluencerChange(e.target.value)} className="form-select mt-1 block w-full">
              <option value="">Select Influencer</option>
              {influencers.map((influencer) => (
                <option key={influencer.id} value={influencer.id}>
                  {influencer.name}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={handleCreatePromoCode}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Promo Code'}
          </button>
          {successMessage && <p>{successMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default PromoCodeForm;
