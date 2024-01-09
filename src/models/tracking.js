const API_URL = '/api/tracking';

export const getInfluencerId = async ({promoCodeParam}) => {
  try {
    const response = await fetch(`${API_URL}/get-influencer-id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promoCodeParam }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Error getting the id:', result.message);
      throw new Error(result.message); // You might want to throw an error here
    }

    const { influencerId } = result;
    return { influencerId };
  } catch (error) {
    console.error('Error getting the id:', error);
    throw error;
  }
};
export const getInfluencerIdandPromoCodeID = async ({promoCodeParam}) => {
  try {
    const response = await fetch(`${API_URL}/get-influencer-and-promocode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promoCodeParam }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Error getting the id:', result.message);
      throw new Error(result.message); // You might want to throw an error here
    }

    const { influencerId , promoCodeId} = result;
    return { influencerId, promoCodeId};
  } catch (error) {
    console.error('Error getting the id:', error);
    throw error;
  }
};

export const trackClick = async (promoCodeParam) => {
  try {
    // Send the promo code to the server to track the click
    const response = await fetch(`${API_URL}/track-click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promoCodeParam }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Error tracking click:', result.message);
    }
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};



export const trackSignup = async ({ promoCodeParam, userId }) => {
  try {
    // Send the promo code to the server to track the click
    const response = await fetch(`${API_URL}/track-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promoCodeParam, userId }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Error tracking click:', result.message);
    }
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};



export const trackRegisteredPatient = async ({ userId, promoCodeId, patientId }) => {
  try {
    const response = await fetch(`${API_URL}/track-registered-patient`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  userId, promoCodeId, patientId }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Error tracking patient:', result.message);
    }
  } catch (error) {
    console.error('Error tracking patent:', error);
  }
};
