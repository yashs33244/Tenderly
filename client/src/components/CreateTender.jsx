import React, { useState } from 'react';
import Navbar from './Navbar';

import axios from 'axios';

const CreateTender = () => {
  const [formData, setFormData] = useState({
    nameOfWork: '',
    location: '',
    approxCost: '',
    bidSecurity: '',
    address: '',
    uploadDateTime: '',
    tenderNumber: '',
  });

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const authToken = localStorage.getItem('token'); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/tenders/submit-form', formData,{
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      alert('Tender published successfully!');
      // Clear the form
      setFormData({
        nameOfWork: '',
        location: '',
        approxCost: 0,
        bidSecurity: 0,
        address: '',
        uploadDateTime: '',
        tenderNumber: '',
        numberOfBids : 0  
      });
    } catch (error) {
      console.error(`Error publishing tender: ${error}`);
      alert('Error publishing tender');
    }
  };

  const { nameOfWork, location, approxCost, bidSecurity, address, uploadDateTime, tenderNumber } = formData;

  return (
    <div className='bg-white'>
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <Navbar/>
      
      </div>
      <div className="pt-20 mx-auto "></div>
        <div className="bg-blue-200 min-h-screen">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">Create New Tender</h1>
              <form className="e-tender-form" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-section">
                    <label htmlFor="nameOfWork" className="text-gray-800 font-semibold">Name of Work:</label>
                    <input
                      type="text"
                      id="nameOfWork"
                      name="nameOfWork"
                      value={nameOfWork}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="location" className="text-gray-700 font-semibold">Location:</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={location}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="approxCost" className="text-gray-700 font-semibold">Approx Cost of Work:</label>
                    <input
                      type="text"
                      id="approxCost"
                      name="approxCost"
                      value={approxCost}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="bidSecurity" className="text-gray-700 font-semibold">Bid Security:</label>
                    <input
                      type="text"
                      id="bidSecurity"
                      name="bidSecurity"
                      value={bidSecurity}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="address" className="text-gray-700 font-semibold">Address of Office:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="uploadDateTime" className="text-gray-700 font-semibold">Date and Time of Upload:</label>
                    <input
                      type="datetime-local"
                      id="uploadDateTime"
                      name="uploadDateTime"
                      value={uploadDateTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
                    />
                  </div>
                  <div className="form-section">
                    <label htmlFor="tenderNumber" className="text-gray-700 font-semibold">Tender Number:</label>
                    <input
                      type="text"
                      id="tenderNumber"
                      name="tenderNumber"
                      value={tenderNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 mt-2"
                    />
                  </div>
                </div>
                <div className="text-center mt-8">
                  <button className="bg-[#0000FF] text-white font-bold py-2 px-6 rounded" type="submit" onClick={handleSubmit}>
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        
        </div>
    </div>
  );
};

export default CreateTender;