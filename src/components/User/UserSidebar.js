import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const UserSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
      setIsExpanded(!isExpanded);
    };
  return (
    <div className={`w-64 bg-gray-800 text-white h-screen sidebar ${isExpanded ? '' : 'collapsed'}`}>
    <div className="p-4">
      <img src="/netlix.png" alt="Logo" className="h-15 w-21" />
    </div>
    <button onClick={toggleSidebar} className="block p-1 hover:bg-gray-700">
      <i className={`fa ${isExpanded ? 'fa-chevron-left' : 'fa-bars'} text-xl`}></i>
    </button>
    <ul className="px-4">
    <li className="py-4">
      <Link to="">
        <FontAwesomeIcon icon={faHome} className="mr-2" /> User Dashboard
      </Link>
    </li>

    <li className="py-4">
      <Link to="/patient/registration">
      <FontAwesomeIcon icon={faHospitalUser}  className="mr-2" /> Register a Patient
      </Link>
    </li>

  </ul>
  </div>

  );
};

export default UserSidebar;
