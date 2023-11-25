import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons'; // Import the desired icons
import {faHospitalUser, faUserTie} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {

  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`w-64 bg-gray-800 text-white h-screen sidebar ${isExpanded ? '' : 'collapsed'}`}>
      <div className="p-4">
        {/* Add your logo image here */}
        <img src="/netlix.png" alt="Logo" className="h-15 w-21" />
      </div>
      <button onClick={toggleSidebar} className="block p-1 hover:bg-gray-700">
        <i className={`fa ${isExpanded ? 'fa-chevron-left' : 'fa-bars'} text-xl`}></i>
      </button>
      <ul className="px-4">
        <li className="py-4">
          <Link to="/admin/dashboard">
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Admin Dashboard
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/admin">
          <FontAwesomeIcon icon={faUserTie}  className="mr-2" /> Admins
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/influencers">
            <FontAwesomeIcon icon={faUsers} className="mr-2" /> Influencers
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/patients">
          <FontAwesomeIcon icon={faHospitalUser}  className="mr-2" /> Patients
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/users">
          <FontAwesomeIcon icon={faHospitalUser}  className="mr-2" /> Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
