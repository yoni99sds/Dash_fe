
import axios from 'axios';

const BASE_URL = '/api/auth';

const authenticateUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password });

    if (response.data.success && response.data.token) {
      const token = response.data.token;
      const decodedToken = decodeJWT(token);
      const role = decodedToken.role;
      const id = decodedToken.id;

      // Store the decoded token in session storage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('id', id);
      console.log('Stored token:', token);
      console.log('Stored Id:', id);
      return { success: true, role, id };
    } else {
      return { success: false, message: response.data.message || 'Authentication failed.' };
    }
  } catch (error) {
    console.error('Error during authentication:', error.response?.data || error.message);
    throw error;
  }
};


const registerUser = async ({ name, username, password, influencerId, promoCodeId }) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password, influencerId, promoCodeId }),
    });
    
    return await response.json();
    
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error decoding JWT:', error);
    throw error;
  }
};

export { authenticateUser, registerUser };
