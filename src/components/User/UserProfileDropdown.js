import React, { useState } from 'react';

function UserProfileDropdown({ influencer, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left ml-auto">
      <div>
        <button
          onClick={toggleDropdown}
          className="flex items-center text-blue-700 hover:text-green-800"
        >
          <img
            src={influencer.profilePicture}
            alt="Influencer Profile"
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2">{influencer.name}</span>
          <svg
            className="ml-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 19a1 1 0 01-1-1v-7a1 1 0 112 0v7a1 1 0 01-1 1zM5.293 7.293a1 1 0 011.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <div className="py-1" role="none">
            <a
              href="#edit-profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Edit Profile
            </a>
            <a
              href=" "
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={() => {
                onLogout(); 
              }}
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfileDropdown;
