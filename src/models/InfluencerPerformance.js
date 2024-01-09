import axios from 'axios';

const BASE_URL = '/api';

const getInfluencerPerformance = async (influencerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/influencersperformance/${influencerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching influencer performance:', error);
    return { success: false, message: 'Error fetching influencer performance' };
  }
};

export { getInfluencerPerformance };



