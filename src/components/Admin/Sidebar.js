import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faListOl,
  faUserTie,
  faHospitalUser,
  faAngleDown,
  faLink,
  faUserGroup
  
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const [showPromoCodeMenu, setShowPromoCodeMenu] = useState(false);
  const [showReferralLinkMenu, setShowReferralLinkMenu] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };



  const togglePromoCodeMenu = () => {
    setShowPromoCodeMenu(!showPromoCodeMenu);
  };

  const toggleReferralLinkMenu = () => {
    setShowReferralLinkMenu(!showReferralLinkMenu);
  };

  return (
    <div className={`w-64 bg-gray-800 text-white h-screen sidebar ${isExpanded ? '' : 'collapsed'}`}>
      <div className="m p-4">
        {/* Add your logo image here */}
        <img src="/netlix.png" alt="Logo" className="h-15 w-21" />
      </div>
      <button onClick={toggleSidebar} className="block p-1 hover:bg-gray-700">
        <i className={`fa ${isExpanded ? 'fa-chevron-left' : 'fa-bars'} text-xl`}></i>
      </button>
      <ul className="px-8">
        <li className="py-4">
          <Link to="/admin/dashboard">
            <FontAwesomeIcon icon={faHome} className="mr-2" /> Admin Dashboard
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/admin">
            <FontAwesomeIcon icon={faUserTie} className="mr-2" /> Admins
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/influencers">
            <FontAwesomeIcon icon={faUsers} className="mr-2" /> Influencers
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/patients">
            <FontAwesomeIcon icon={faHospitalUser} className="mr-2" /> Patients
          </Link>
        </li>
        <li className="py-4">
          <Link to="/admin/users">
          <FontAwesomeIcon icon={faUserGroup}  className="mr-2" /> Users
          </Link>
        </li>
        <li className="py-4">
          <button onClick={togglePromoCodeMenu} className="flex items-center justify-between w-full">
            <div>
            <FontAwesomeIcon icon={faListOl}  className="mr-2" /> Promo Codes
            </div>
            <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
          </button>
          {showPromoCodeMenu && (
            <ul className="ml-4">
              <li className="py-4">
                <Link to="/promo-codes-list">View Promo Codes</Link>
              </li>
              <li className="py-2">
                <Link to="/create-promo-code">Create Promo Code</Link>
              </li>
            </ul>
          )}
        </li>
        <li className="py-4">
          <button onClick={toggleReferralLinkMenu} className="flex items-center justify-between w-full">
            <div>
            <FontAwesomeIcon icon={faLink}   className="mr-2" /> Referral Links
            </div>
            <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
          </button>
          {showReferralLinkMenu && (
            <ul className="ml-4">
              <li className="py-4">
                <Link to="/referral-links">View Referral Links</Link>
              </li>
              <li className="py-2">
                <Link to="/create-referral-link">Create Referral Link</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
