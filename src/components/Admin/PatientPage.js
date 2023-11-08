import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminProfileDropdown from './AdminProfileDropdown';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function PatientPage() {
    const history =useHistory();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    age: '',
    sex: '',
    city: '',
    country: '',
  });
  const [editingPatient, setEditingPatient] = useState(null);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [adminUser] = useState({
    name: 'Admin User',
    profilePicture: '/admin.png', 
  });
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    // Then, redirect to the login page
  
    history.push('/');
  };
  useEffect(() => {
    // In a real application, this data would come from a server.

    const mockPatients = [
      { id: 1, fullName: 'Patient 1', email: 'patient1@example.com', dateOfBirth: '1990-01-15', age: 33, sex: 'Male', city: 'New York', country: 'USA' },
      { id: 2, fullName: 'Patient 2', email: 'patient2@example.com', dateOfBirth: '1995-06-20', age: 28, sex: 'Female', city: 'Los Angeles', country: 'USA' },
    ];

    setPatients(mockPatients);
    setIsLoading(false);

    const mediaQuery = window.matchMedia('(max-width: 768px)'); 

    const handleMediaQueryChange = (e) => {
      if (e.matches) {
        setSidebarOpen(false); // Close sidebar in mobile view
      } else {
        setSidebarOpen(true); // Open sidebar in larger screens
      }
    };

    // Add event listener to handle media query changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Initial check of media query and set sidebar state accordingly
    if (mediaQuery.matches) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  const handleAddPatient = () => {
    if (newPatient.fullName && newPatient.email) {
      // For now, we'll create a mock patient with a random ID.
      const randomId = Math.floor(Math.random() * 1000);
      setPatients([
        ...patients,
        { id: randomId, ...newPatient },
      ]);

      setNewPatient({
        fullName: '',
        email: '',
        dateOfBirth: '',
        age: '',
        sex: '',
        city: '',
        country: '',
      });
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
  };

  const handleUpdatePatient = () => {
    if (editingPatient) {
      const updatedPatients = patients.map((patient) =>
        patient.id === editingPatient.id ? editingPatient : patient
      );
      setPatients(updatedPatients);
      setEditingPatient(null);
    }
  };

  const handleDeletePatient = (patientId) => {
    const updatedPatients = patients.filter((patient) => patient.id !== patientId);
    setPatients(updatedPatients);
  };

  return (
    <div className="flex">
         {sidebarOpen && <Sidebar isExpanded={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className={`flex-1 p-10 main-content ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
      <div className="absolute top-0 right-0 m-4">
      <AdminProfileDropdown user={adminUser} onLogout={handleLogout} />
</div>
        <button className="block md:hidden" onClick={toggleSidebar}>
          {sidebarOpen ? (
            // Use a different icon for when the sidebar is open
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Use a different icon for when the sidebar is closed
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="py-12">
          <h1 className="text-2xl font-semibold mb-4">Patient Management</h1>

          {isLoading ? (
            <p>Loading patient data...</p>
          ) : (
            <div className="table-responsive-mobile" style={{ overflowX: 'auto', maxHeight: '400px' }}>
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 py-2 px-4">Id</th>
                    <th className="border border-gray-300 py-2 px-4">Full Name</th>
                    <th className="border border-gray-300 py-2 px-4">Email</th>
                    <th className="border border-gray-300 py-2 px-4">Date of Birth</th>
                    <th className="border border-gray-300 py-2 px-4">Age</th>
                    <th className="border border-gray-300 py-2 px-4">Sex</th>
                    <th className="border border-gray-300 py-2 px-4">City</th>
                    <th className="border border-gray-300 py-2 px-4">Country</th>
                    <th className="border border-gray-300 py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="border border-gray-300 py-2 px-4">{patient.id}</td>
                      <td className="border border-gray-300 py-2 px-4">
                        {editingPatient === patient ? (
                          <input
                            type="text"
                            value={editingPatient.fullName}
                            onChange={(e) => setEditingPatient({ ...editingPatient, fullName: e.target.value })}
                          />
                        ) : (
                          patient.fullName
                        )}
                      </td>
                      <td className="border border-gray-300 py-2 px-4">
                        {editingPatient === patient ? (
                          <input
                            type="text"
                            value={editingPatient.email}
                            onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })}
                          />
                        ) : (
                          patient.email
                        )}
                      </td>
                      <td className="border border-gray-300 py-2 px-4">{patient.dateOfBirth}</td>
                      <td className="border border-gray-300 py-2 px-4">{patient.age}</td>
                      <td className="border border-gray-300 py-2 px-4">{patient.sex}</td>
                      <td className="border border-gray-300 py-2 px-4">{patient.city}</td>
                      <td className="border border-gray-300 py-2 px-4">{patient.country}</td>
                      <td className="border border-gray-300 py-2 px-4">
                        {editingPatient === patient ? (
                          <button onClick={handleUpdatePatient} className="text-blue-600 hover:underline">
                            Save
                          </button>
                        ) : (
                          <>
                            <button onClick={() => handleEditPatient(patient)} className="text-blue-600 hover:underline">
                              Edit
                            </button>
                            <button onClick={() => handleDeletePatient(patient.id)} className="text-red-600 hover:underline">
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Add Patient</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={newPatient.fullName}
              onChange={(e) => setNewPatient({ ...newPatient, fullName: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={newPatient.email}
              onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Date of Birth"
              value={newPatient.dateOfBirth}
              onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Age"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Sex"
              value={newPatient.sex}
              onChange={(e) => setNewPatient({ ...newPatient, sex: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="City"
              value={newPatient.city}
              onChange={(e) => setNewPatient({ ...newPatient, city: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <input
              type="text"
              placeholder="Country"
              value={newPatient.country}
              onChange={(e) => setNewPatient({ ...newPatient, country: e.target.value })}
              className="border border-gray-300 py-2 px-4 mb-2"
            />
            <button onClick={handleAddPatient} className="bg-green-800 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientPage;
