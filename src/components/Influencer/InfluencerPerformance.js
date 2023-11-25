import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { faHospitalUser, faPeopleArrows, faUserPlus, faMouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function InfluencerPerformancePage() {
  const [influencer] = useState({
    id: 1,
    name: 'Influencer 1',
    referralCode: 'REF123',
    promoCode: 'PROMO456',
    clicks: 13,
    signedUp: 20,
    registeredPatients: 11,
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-rose-800 mb-4">
        <FontAwesomeIcon icon={faPeopleArrows} className='mr-4' />
        Influencer Performance
      </h1>
      <div className="border border-gray-300 p-4 rounded-md shadow-md">
        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="text-2xl mr-2">
            <FaUser />
          </div>
          <div className="text-xl font-semibold">{influencer.name}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600 ">Referral Code:</div>
          <div className="text-blue-500 font-semibold px-4">{influencer.referralCode}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Promo Code:</div>
          <div className='px-4 '>{influencer.promoCode || 'N/A'}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="text-center bg-blue-100 p-2 rounded-md">
            <div className="text-blue-500 font-semibold">
              Clicks
            </div>
            <div className="text-blue-500 font-semibold"><FontAwesomeIcon icon={faMouse} size="3x" /></div>
            <div className="font-bold text-4xl">{influencer.clicks}</div>
          </div>
          <div className="text-center bg-green-100 p-2 rounded-md ">
            <div className="text-green-900 font-semibold">
              Signed Up
            </div>
            <div className="text-green-900 font-semibold"><FontAwesomeIcon icon={faUserPlus} size="3x" /></div>
            <div className="font-bold text-green-600 text-4xl">{influencer.signedUp}</div>
          </div>
          <div className="text-center bg-purple-100 p-2 rounded-md">
            <div className="text-purple-500 font-semibold">
              Registered Patients
            </div>
            <div className="text-purple-500"><FontAwesomeIcon icon={faHospitalUser} size="3x" /></div>
            <div className="font-bold text-4xl">{influencer.registeredPatients}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfluencerPerformancePage;
