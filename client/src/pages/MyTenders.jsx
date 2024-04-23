import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  
import HeroSection from '../components/Hero';
import UserVerticalGrid from '../components/UserVerticalgrid';
import axios from 'axios';

import { BASE_URL } from '../utils/url';

const MyTenders = () => {
  const [tendersData, setTendersData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found. Redirect user to login page or display message.');
      return;
    }

    // Fetch user profile to get user ID
    axios.get(`${BASE_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => {
        const user = response.data;
        const userId = user._id;
        // Fetch tenders associated with the user ID
        axios.get(`${BASE_URL}/api/tenders/my-tenders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then((response) => {
          setTendersData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user tenders:', error);
        });
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
      
  }, []);

//   const handleSubmit = () => {
//     window.location = '/create-tender';
//   }

  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      {/* <div className="pt-20 mx-auto">
        <HeroSection />
      </div> */}
      <div className="container mx-auto p-8">
       
      </div>
      <div className="pt-16 mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-10 mb-10">
          <h1 className="text-7xl font-bold mb-4">Your Published Tenders</h1>
          <p className="text-gray-600 mb-8">Bid anytime anywhere</p>
          {/* Render fetched tender data here */}
          <UserVerticalGrid tenders={tendersData} />
            {/* <TenderCard/> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyTenders;
