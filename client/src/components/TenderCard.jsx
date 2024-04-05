// TenderCard.jsx
import React from 'react';

const TenderCard = ({ title, description, deadline, ...otherProps }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-4" {...otherProps}>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-3">{description}</p>
      <p className="text-gray-500 font-medium text-sm">Deadline: {deadline}</p>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4">
        Bid
      </button>
    </div>
  );
};

export default TenderCard;
