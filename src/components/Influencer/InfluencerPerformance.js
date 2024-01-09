import React, { useState, useEffect } from 'react';
import { getInfluencerPerformance } from '../../models/api';
import { useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import { faHospitalUser,  faPeopleGroup,faUserPlus ,  faMouse} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const InfluencerPerformance = () => {
  const { id } = useParams();
  const [performance, setPerformance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfluencerPerformance(id);

        console.log('API Response:', response);

        if (response.success) {
          setPerformance(response.performance);
        } else {
          console.error('Error fetching performance data:', response.message);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (

    <div className="p-4">
 
      <h1 className="text-2xl font-bold text-rose-800 mb-4"><FontAwesomeIcon icon={ faPeopleGroup} className='px-4' />Influencer Performance</h1>
      {loading && <p>Loading...</p>}
      <div className="border border-gray-300 p-4  rounded-md shadow-md">
         <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="text-2xl mr-2">
            <FaUser />
          </div>
          <div className="text-xl font-semibold">{performance?.name}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Referral Link:</div>
          <div className="text-blue-500  px-4 font-semibold">{performance?.referral_link}</div>
        </div>
        <div className="mb-2">
          <div className="text-gray-600">Promo Code:</div>
          <div className='px-4 '>{performance?.promo_codes}</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div className="text-center bg-blue-100 p-2 rounded-md">
        <div className="text-blue-500 font-semibold">
          
          Clicks
        </div>
        <div className="text-blue-500 font-semibold"><FontAwesomeIcon icon={faMouse} size="3x" /></div>
        <div className="font-bold text-4xl"> {performance?.clicks?.count}</div>
      </div>
      <div className="text-center bg-green-100 p-2 rounded-md ">
        <div className="text-green-900 font-semibold">
          
          Signed Up
        </div>
        <div className="text-green-900 font-semibold"><FontAwesomeIcon icon={faUserPlus} size="3x" /></div>
        <div className="font-bold text-green-600 text-4xl">{performance?.signups?.count}</div>
      </div>
      <div className="text-center bg-purple-100 p-2 rounded-md">
        <div className="text-purple-500 font-semibold">
          
          Registered Patients
        </div>
        <div className="text-purple-500"><FontAwesomeIcon icon={faHospitalUser} size="3x" /></div>
        <div className="font-bold text-4xl">{performance?.registeredPatients?.count}</div>
      </div>
    </div>

      </div>
      
    </div>
    

  );}


export default InfluencerPerformance;
