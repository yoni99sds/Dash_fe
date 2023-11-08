import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle,
  faExclamationCircle,
  faHospitalUser,
} from '@fortawesome/free-solid-svg-icons';

function PatientStatusPage() {
  const [patients] = useState([
    {
      status: 'Completed',
      count: 10,
    },
    {
      status: 'Departed',
      count: 5,
    },
    {
      status: 'Pending',
      count: 2,
    },
  ]);

  const totalCompleted = patients.find((patient) => patient.status === 'Completed').count;
  const totalDeparted = patients.find((patient) => patient.status === 'Departed').count;
  const totalPending = patients.find((patient) => patient.status === 'Pending').count;

  return (
    <div className="p-4">
      <h1 className="text-2xl text-lime-600 font-bold mb-4">
        <FontAwesomeIcon icon={faHospitalUser} className="px-4" /> Patient Status
      </h1>

      <div className="border border-gray-300 p-4 rounded-md shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center bg-green-100 p-2 rounded-md">
            <div className="font-semibold text-green-800">Completed</div>
            <div className="font-bold text-4xl">
              <FontAwesomeIcon icon={faCheckCircle} size="1x" color="green" /> {totalCompleted}
            </div>
          </div>
          <div className="text-center bg-red-100 p-2 rounded-md">
            <div className="font-semibold text-red-500">Departed</div>
            <div className="font-bold text-4xl">
              <FontAwesomeIcon icon={faTimesCircle} size="1x" color="red" /> {totalDeparted}
            </div>
          </div>
          <div className="text-center bg-orange-100 p-2 rounded-md">
            <div className="font-semibold text-orange-500">Pending</div>
            <div className="font-bold text-4xl">
              <FontAwesomeIcon icon={faExclamationCircle} size="1x" color="orange" /> {totalPending}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientStatusPage;
