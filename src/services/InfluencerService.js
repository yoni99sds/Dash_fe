import axios from 'axios';

const INFLUENCER_API_BASE_URL = '/api/influencers';

class InfluencerService {
  getAllInfluencers() {
    return axios.get(INFLUENCER_API_BASE_URL);
  }

  createInfluencer(influencer) {
    return axios.post(INFLUENCER_API_BASE_URL, influencer);
  }

  updateInfluencer(influencer) {
    return axios.put(`${INFLUENCER_API_BASE_URL}/${influencer.id}`, influencer);
  }

  deleteInfluencer(influencerId) {
    return axios.delete(`${INFLUENCER_API_BASE_URL}/${influencerId}`);
  }
}

export default new InfluencerService();
