const fetchAdmins = async () => {
    const response = await fetch('/api/admin');
    const data = await response.json();
    return data;
  };
  
  const addAdmin = async (newAdmin) => {
    const response = await fetch('/api/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAdmin),
    });
    const data = await response.json();
    return data;
  };
  
  const updateAdmin = async (id, updatedAdmin) => {
    const response = await fetch(`/api/admin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAdmin),
    });
    const data = await response.json();
    return data;
  };
  
  const deleteAdmin = async (id) => {
    await fetch(`/api/admin/${id}`, {
      method: 'DELETE',
    });
  };
  
  export { fetchAdmins, addAdmin, updateAdmin, deleteAdmin };
  