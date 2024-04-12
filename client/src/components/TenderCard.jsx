import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const TenderCard = ({ tenderId, title, tenderNumber, location, approxCost, bidSecurity, uploadDateTime, phoneNumber, video, pdf, numberOfBids, isActive }) => {
  const [bidAmount, setBidAmount] = useState(0);
  const token = localStorage.getItem('token');

  
  const handleBidSubmit = async () => {
    try {
      // Make a request to submit bid
      await axios.post(`http://localhost:3000/api/bids/submit-bid/${tenderId}`, {
        bidAmount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset bid amount after submission
      setBidAmount(0);
      // Notify the user about successful bid submission
      alert('Bid submitted successfully!');
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again later.');
    }
  };

  const isTenderExpired = moment(uploadDateTime).add(30, 'days').isBefore(moment());

  return (
    <div
      className={`border-4 rounded-lg shadow-md p-6 ${isTenderExpired ? 'border-red-400' : 'border-green-400'}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {!isTenderExpired && (
          <div>
            <input
            type="number"
            className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={handleBidSubmit}>
            Submit Bid
            </button>
          </div>
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
          <span className="font-bold">Upload Date and Time:</span> {uploadDateTime}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Phone Number:</span> {phoneNumber}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Video Uploaded:</span>{' '}
          <a href={video} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            {video}
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-bold">PDF:</span>{' '}
          <a href={pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
            {pdf}
          </a>
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Number of Bids:</span> {numberOfBids}
        </p>
      </div>
    </div>
  );
};

export default TenderCard;