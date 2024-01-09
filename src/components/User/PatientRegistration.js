import React, { useState, useEffect } from 'react';
import { registerPatient } from '../../models/PatientRegister';
import { trackRegisteredPatient } from '../../models/tracking';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UserSidebar from './UserSidebar';
// import { trackRegisteredPatient } from '../../models/tracking';
import UserProfileDropdown from './UserProfileDropdown';

const PatientRegistration = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'male',
    dateOfBirth: '',
    city: '',
    country: '',
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [User] = useState({
    name: 'User',
    profilePicture: '/admin.png',
  });
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history.push('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Example: Populate dateOfBirth with the current date if it's empty
const currentDate = new Date().toISOString().split('T')[0];
setFormData({ ...formData, dateOfBirth: formData.dateOfBirth || currentDate });

    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setSidebarOpen(false); 
      } else {
        setSidebarOpen(true); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Call the registerPatient function with the formData and user ID
      const result = await registerPatient(formData);
  
      console.log('Result:', result);
      const { userId, promoCodeId, patientId } = result;
      if (promoCodeId) {
     
  
        console.log('User ID:', userId);
        console.log('Promo Code ID:', promoCodeId);
        console.log('Patient ID:', patientId);
  
        alert('Patient registered successfully!');
  
        // Call the trackRegisteredPatient function with userId, promoCodeId, and patientId
        await trackRegisteredPatient({userId, promoCodeId, patientId} );
      } else {
        alert('Error registering patient. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering patient. Please check your inputs or see the console for more details.');
      throw error;
    }
  };
  

  return (
       <div className="flex">
    {sidebarOpen && <UserSidebar isExpanded={sidebarOpen} toggleSidebar={toggleSidebar} />}
    <div className={`flex-1 p-10 main-content ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="absolute top-0 right-0 m-4">
        <UserProfileDropdown influencer={User} onLogout={handleLogout} />
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
        </button> <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            </div>
      <h2 className="text-2xl font-semibold mb-6">Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender:
          </label>
          <select
            className="border rounded w-full py-2 px-3"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
            Date of Birth:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
            Country:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        
        >
          Register
        </button>
      </form>
    </div></div>
  );
};

export default PatientRegistration;
