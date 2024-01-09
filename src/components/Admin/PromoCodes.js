// PromoCodes.js
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getPromoCodesList, deletePromoCode } from '../../models/PromoCodeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';

const PromoCodes = () => {
  const history = useHistory();
  const [promoCodes, setPromoCodes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser] = useState({
    name: 'Admin User',
    profilePicture: '/admin.png',
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/');
  };

  const handleEdit = (promoCodeId) => {
    // Implement the edit functionality or navigate to the edit page
    console.log(`Edit promo code with ID: ${promoCodeId}`);
  };

  const handleDelete = async (promoCodeId) => {
    try {
      await deletePromoCode(promoCodeId);
      // Refresh the promo codes list after deletion
      const updatedCodes = await getPromoCodesList();
      setPromoCodes(updatedCodes);
    } catch (error) {
      console.error('Error deleting promo code:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await getPromoCodesList();
        console.log('Fetched Promo Codes:', codes);
        setPromoCodes(codes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
        setLoading(false);
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

  return (
    <div className="flex">
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
        <h2 className="text-2xl font-semibold mb-4 py-20">Promo Codes List</h2>

        {isLoading && <p>Loading promo codes...</p>}

        {!isLoading && promoCodes.length === 0 && <p>No promo codes available.</p>}

        {!isLoading && promoCodes.length > 0 && (
          <div className="table-responsive-mobile " style={{ overflowX: 'auto', maxHeight: '400px' }}>
             <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 ">Code</th>
                  <th className="border border-gray-300 px-4 py-2 ">Referral Link</th>
                  <th className="border border-gray-300 px-4 py-2 ">URL</th>
                  <th className="border border-gray-300 px-8 py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promoCodes.map((promoCode) => (
                  <tr key={promoCode.id}>
                    <td className="border border-gray-300 px-4 py-2">{promoCode.code || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">{promoCode.referralLink || 'N/A'}</td>
                    <td className="border border-gray-300 px-4 py-2">
                    {promoCode.promoCodeUrl ? (
        <a href={promoCode.promoCodeUrl} target="_blank" rel="noopener noreferrer">
          {promoCode.promoCodeUrl}
        </a>
      ) : (
        'N/A'
      )}
                    </td>
                  
                    <td className="border border-gray-300 px-4 py-2">
                      <button onClick={() => handleEdit(promoCode.id)} className="text-blue-500 hover:text-blue-700 mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button onClick={() => handleDelete(promoCode.id)} className="text-red-500 hover:text-red-700">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCodes;
