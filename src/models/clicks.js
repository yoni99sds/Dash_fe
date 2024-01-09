import axios from 'axios';

const API_URL = '/api';



export const fetchClicks = async () => {
  try {
    const response = await axios.get(`${API_URL}/clicks`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
