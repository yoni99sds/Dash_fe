const fetchInfluencers = async () => {
  const response = await fetch('/api/influencers');
  const data = await response.json();
  return data;
};

const addInfluencer = async (newInfluencer) => {
  const response = await fetch('/api/influencers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newInfluencer),
  });
  const data = await response.json();
  return data;
};

const updateInfluencer = async (id, updatedInfluencer) => {
  const response = await fetch(`/api/influencers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedInfluencer),
  });
  const data = await response.json();
  return data;
};

const deleteInfluencer = async (id) => {
  await fetch(`/api/influencers/${id}`, {
    method: 'DELETE',
  });
};

export { fetchInfluencers, addInfluencer, updateInfluencer, deleteInfluencer };
