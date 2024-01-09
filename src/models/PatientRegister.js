import axios from "axios";
const API_URL = '/api';

export const registerPatient = async (formData) => {
  try {
    console.log('Sending data to register patient:', formData);

    // Get the token and user ID from session storage
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('id');

    

    // Call the API with the token and user ID in the headers
    const response = await axios.post(`${API_URL}/register-patient`, formData, {
      headers: {
        Authorization: ` ${token}`,
        'user-id': `${userId}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Response:', response);
    
    return response.data;
    
  } catch (error) {
    console.error('Error:', error);
    throw error; // Add this line to propagate the error
  }
};
