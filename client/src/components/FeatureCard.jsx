import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faDollarSign, faTools, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const FeatureCard = ({ title, description, icon, onClick }) => {
  let selectedIcon;
  switch (icon) {
    case 'search':
      selectedIcon = faSearch;
      break;
    case 'price':
      selectedIcon = faDollarSign;
      break;
    case 'manage':
      selectedIcon = faTools;
      break;
    case 'submit':
      selectedIcon = faPaperPlane;
      break;
    default:
      selectedIcon = faSearch;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4" onClick={onClick}>
        <div className="bg-blue-500 text-white rounded-full p-4 mr-4 flex items-center justify-center">
          <FontAwesomeIcon icon={selectedIcon} size="2x" />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
      <div className="mt-4 flex justify-end">
        <button className="text-blue-500 hover:text-blue-700 font-semibold focus:outline-none">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;
