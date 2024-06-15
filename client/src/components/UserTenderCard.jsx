import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../utils/url';

const UserTenderCard = ({ tenderId, title, tenderNumber, location, approxCost, bidSecurity, uploadDateTime, phoneNumber, video, pdf, numberOfBids, isActive }) => {
  const isTenderExpired = moment(uploadDateTime).add(30, 'days').isBefore(moment());
  const [isTenderActive, setIsTenderActive] = useState(isActive && !isTenderExpired);

  const handleToggleTender = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/api/tenders/close-tender/${tenderId}`);
      if (response.status === 200) {
        setIsTenderActive(!isTenderActive);
      }
    } catch (error) {
      console.error('Error toggling tender:', error);
    }
  };

  return (
    <div className={`border-4 rounded-lg shadow-md p-6 ${isTenderActive ? 'border-green-400' : 'border-red-400'}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <p className="text-gray-700">
          <span className="font-bold">Tender ID:</span> {tenderId}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Tender Number:</span> {tenderNumber}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Location:</span> {location}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Approximate Cost:</span> {approxCost}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Bid Security:</span> {bidSecurity}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Upload Date and Time:</span> {moment(uploadDateTime).format('YYYY-MM-DD HH:mm')}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Phone Number:</span> {phoneNumber}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Video Uploaded:</span>{' '}
          <a
            href={video}
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Video
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-bold">PDF:</span>{' '}
          <a
            href={pdf}
            className="text-blue-500 hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Number of Bids:</span> {numberOfBids}
        </p>
      </div>
      {!isTenderExpired && (
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white white:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 white:focus:ring-pink-800"
          onClick={handleToggleTender}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white white:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {isTenderActive ? 'Close Tender' : 'Open Tender'}
          </span>
        </button>
      )}
    </div>
  );
};

export default UserTenderCard;
