import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  
import HeroSection from '../components/Hero';
import VerticalGrid from '../components/VerticalGrid';
import axios from 'axios';
import TenderCard from '../components/TenderCard';

const Tenders = () => {
  const [tendersData, setTendersData] = useState([]);

  useEffect(() => {
    // Fetch token from localStorage or wherever it is stored in your application
    const token = localStorage.getItem('token');

    // If token exists, include it in the request headers
    if (token) {
      axios.get('http://localhost:3000/api/tenders/all-tenders', {
        headers: {
          Authorization: token
        }
      })
        .then((response) => {
          setTendersData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tenders:', error);
        });
    }
  }, []);

  const handleSubmit = () => {
    window.location = '/create-tender';
  }

  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      <div className="pt-20 mx-auto">
        <HeroSection />
      </div>
      <div className="container mx-auto p-8">
       
      </div>
      <div className="pt-16 mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-10 mb-10">
          <h1 className="text-7xl font-bold mb-4">New Tenders</h1>
          <p className="text-gray-600 mb-8">Bid anytime anywhere</p>
          {/* Render fetched tender data here */}
          <VerticalGrid tenders={tendersData} />
            <TenderCard/>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tenders;
