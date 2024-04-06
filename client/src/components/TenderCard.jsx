import React, { useState } from 'react';

const TenderCard = ({ title, tenderNumber, location, approxCost, bidSecurity, uploadDateTime }) => {
  const [showBidSection, setShowBidSection] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  const handleBidClick = () => {
    setShowBidSection(!showBidSection);
  };

  const handleBidSubmit = (event) => {
    event.preventDefault();
    // Add your logic to submit the bid amount
    console.log("Bid amount:", bidAmount);
  };

  const handleDownloadPDF = () => {
    // Add your logic to download the PDF
    console.log("Downloading PDF...");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex-grow">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="mt-2 flex flex-wrap gap-4">
          <p><span className="font-semibold">Tender Number:</span> {tenderNumber}</p>
          <p><span className="font-semibold">Location:</span> {location}</p>
          <p><span className="font-semibold">Approximate Cost:</span> {approxCost}</p>
          <p><span className="font-semibold">Bid Security:</span> {bidSecurity}</p>
          <p><span className="font-semibold">Upload Date & Time:</span> {new Date(uploadDateTime).toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4 sm:mt-0 flex flex-col items-end">
        {/* Comments Section */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Comments</h3>
          {/* Add your comment section here */}
        </div>
        {/* Download PDF Button */}
        <button onClick={handleDownloadPDF} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-4">Download PDF</button>
        {/* Bid Section */}
        {showBidSection && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Bid</h3>
            <form onSubmit={handleBidSubmit} className="flex items-center">
              <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder="Enter Bid Amount" className="border border-gray-400 px-4 py-2 rounded-md mr-2" />
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Submit Bid</button>
            </form>
          </div>
        )}
        {/* Bid Now Button */}
        <button onClick={handleBidClick} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Bid Now</button>
      </div>
    </div>
  );
};

export default TenderCard;