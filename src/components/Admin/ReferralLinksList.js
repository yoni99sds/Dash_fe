import React, { useState, useEffect } from 'react';
import { getReferralLinks } from '../../models/referralLinkApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
const ReferralLinksList = () => {
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
    const fetchReferralLinks = async () => {
      try {
        const response = await getReferralLinks();
        setReferralLinks(response);
      } catch (error) {
        console.error('Error fetching referral links:', error);
      }
    };

    fetchReferralLinks();
    
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

  return (
    <div className="flex ">
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
      <h2 className="text-2xl font-semibold mb-4 py-20">Referral Links</h2>
        <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>

                <th className="border border-gray-300 px-4 py-2">Influencer Name</th>
                <th className="border border-gray-300 px-4 py-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {referralLinks.map((link) => (
                <tr key={link.id}>
                  <td className="border border-gray-300 px-4 py-2">{link.id}</td>
                
                  <td className="border border-gray-300 px-4 py-2">{link.Influencer.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{link.link}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>  );
};

export default ReferralLinksList;
