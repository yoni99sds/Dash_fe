import React, { useState, useEffect, useRef } from 'react';
import {  useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { registerUser } from '../../models/auth';
import {trackClick, trackSignup} from '../../models/tracking';
import { getInfluencerIdandPromoCodeID } from '../../models/tracking';
import _ from 'lodash';

function Signup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
 
  const [buttonDisabled, setButtonDisabled] = useState(false);



  const location = useLocation();

  const locationRef = useRef(location);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);


  const hasClickedKey = 'hasClicked';
  const debouncedTrackClick = _.debounce(trackClick, 1000); 

  useEffect(() => {
    // Check if click has already been tracked in this session
    const hasClicked = sessionStorage.getItem(hasClickedKey);
  
    if (!hasClicked) {
      // Extract URL parameters and track click when the component mounts
      const urlParams = new URLSearchParams(window.location.search);
      const promoCodeParam = urlParams.toString(); // Use toString to get the full query string
  
      if (promoCodeParam) {
        debouncedTrackClick(promoCodeParam);
  
        // Mark that click has been tracked in this session
        sessionStorage.setItem(hasClickedKey, 'true');
      }
    }
  }, [debouncedTrackClick]);
  


  

  const handleSignup = async () => {
    try {
      setButtonDisabled(true);
  
      // Extract URL parameters and track click when the component mounts
      const urlParams = new URLSearchParams(window.location.search);
      const promoCodeParam = urlParams.toString(); // Use toString to get the full query string
      
      const { influencerId, promoCodeId } = await getInfluencerIdandPromoCodeID({ promoCodeParam });
  
      const response = await registerUser({ name, username, password, influencerId, promoCodeId });
  
      if (response.success) {
        const { userId } = response;
  
        // Track signup with the obtained userId
        trackSignup({ promoCodeParam, userId });
  
        alert('Signup successful!');
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed. Please check your inputs or see the console for more details.');
    } finally {
      setButtonDisabled(false);
    }
  };
  

  return (
    <div className="login-page">
      <div className="flex justify-center items-center h-screen">
        <div className="bor2 border bg-white text-white max-w-lg lg:w-full">
          <div className="logo-container">
            <img src="/netlix.png" alt="Netflix Logo" className="w-32 h-32 mx-auto mt-4 mb-4" />
          </div>
          <h1 className="text-3xl text-black font-semibold text-center py-4 mb-4">Sign Up</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <div className="text-center p-8">
              <button
                type="button"
                className="bg-green-400 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSignup}
                disabled={buttonDisabled}
              >
                {buttonDisabled ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
