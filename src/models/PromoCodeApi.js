import axios from 'axios';
const API_URL = '/api';



export const createPromoCode = async ({ code, referralLinkId, influencerId, promoCodeUrl }) => {
  try {
    const response = await fetch('/api/promo-codes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, referralLinkId, influencerId, promoCodeUrl }),
    });

    if (!response.ok) {
      throw new Error('Failed to create promo code');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating promo code:', error);
    throw error;
  }
};


export const getPromoCodesList = async () => {
  try {
    const response = await axios.get(`${API_URL}/promo-codes-list`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePromoCode = async (promoCodeId, promoCodeData) => {
  try {
    const response = await axios.put(`${API_URL}/promo-codes/${promoCodeId}`, promoCodeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePromoCode = async (promoCodeId) => {
  try {
    const response = await axios.delete(`${API_URL}/promo-codes/${promoCodeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};