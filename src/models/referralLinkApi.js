import axios from 'axios';

const API_URL = '/api'; 

export const createReferralLink = async ({ link, influencerId }) => {
  try {
    const response = await axios.post(`${API_URL}/referral-links`, { link, influencerId });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getReferralLinks = async () => {
  try {
    const response = await axios.get(`${API_URL}/referral-links`);  
    return response.data;
  } catch (error) {
    throw error;
  }
};
 