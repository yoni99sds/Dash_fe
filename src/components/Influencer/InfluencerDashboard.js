import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import InfluencerPerformance from './InfluencerPerformance';
import InfluencerSidebar from './InfluencerSidebar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import InfluencerProfileDropdown from './InfluencerProfileDropdown';

function InfluencerDashboard() {
  const history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [influencerUser] = useState({
    name: 'Influencer',
    profilePicture: '/admin.png', 
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/');
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

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

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="flex">
      {sidebarOpen && <InfluencerSidebar isExpanded={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className={`flex-1 p-10 main-content ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="absolute top-0 right-0 m-4">
          <InfluencerProfileDropdown influencer={influencerUser} onLogout={handleLogout} />
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

        <InfluencerPerformance />

        <Switch></Switch>
      </div>
    </div>
  );
}

export default InfluencerDashboard;