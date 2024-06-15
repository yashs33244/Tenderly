import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { BASE_URL } from '../utils/url';

const TenderCard = ({ 
  tennderUser, 
  tenderId, 
  title, 
  tenderNumber, 
  location, 
  approxCost, 
  bidSecurity, 
  uploadDateTime, 
  phoneNumber, 
  video, 
  pdf, 
  numberOfBids, 
  isActive,
  isUserTender 
}) => {
  const [bidAmount, setBidAmount] = useState(0);
  const token = localStorage.getItem('token');
  const [tenderOwner, setTenderOwner] = useState(tennderUser); 
  const loggedInUser = localStorage.getItem('userId');
  const [isTenderActive, setIsTenderActive] = useState(isActive);
  const [isTenderExpired, setIsTenderExpired] = useState(false);

  useEffect(() => {
    const expirationDate = moment(uploadDateTime).add(30, 'days');
    const expired = expirationDate.isBefore(moment());
    setIsTenderExpired(expired);
    console.log(`Tender ID: ${tenderId}, Upload Date: ${uploadDateTime}, Expired: ${expired}`);
  }, [uploadDateTime, tenderId]);

  const handleBidSubmit = async () => {
    try {
      await axios.post(`${BASE_URL}/api/bids/submit-bid/${tenderId}`, {
        bidAmount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBidAmount(0);
      alert('Bid submitted successfully!');
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again later.');
    }
  };

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

  const isTenderStillActive = isTenderActive && !isTenderExpired;

  return (
    <div className={`border-4 rounded-lg shadow-md p-6 ${isTenderStillActive ? 'border-green-400' : 'border-red-400'}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {isUserTender && (
          <button 
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-black focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            onClick={handleToggleTender}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {isTenderStillActive ? 'Deactivate' : 'Activate'}
            </span>
          </button>
        )}
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
          <span className="font-bold">Upload Date and Time:</span> {moment(uploadDateTime).format('MMMM Do YYYY, h:mm:ss a')}
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
        {isTenderStillActive && tenderOwner !== loggedInUser && (
          <div>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleBidSubmit}
            >
              Submit Bid
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenderCard;
