import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = () => {
    window.location = '/create-tender';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      <div className="flex-1">
        <div className="pt-20 mx-auto px-4 lg:px-0">
          <div className="max-w-7xl mx-auto py-16">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FaPhoneAlt className="text-blue-600 mr-4" size={24} />
                  <div>
                    <p className="text-gray-700 font-semibold">Call &amp; Trade</p>
                    <p>Monday - Friday</p>
                    <p>9:00 AM - 11:30 PM</p>
                    <p className="mt-2">080 4718 1888</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FaEnvelope className="text-blue-600 mr-4" size={24} />
                  <div>
                    <p className="text-gray-700 font-semibold">Support</p>
                    <p>Monday - Friday</p>
                    <p>8:30 AM - 5:00 PM</p>
                    <p className="mt-2">080 4718 1888</p>
                    <p>080 4718 1999</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FaMapMarkerAlt className="text-blue-600 mr-4" size={24} />
                  <div>
                    <p className="text-gray-700 font-semibold">HQ</p>
                    <p>Tenderly, #153/154,</p>
                    <p>4th Cross, J.P Nagar 4th Phase,</p>
                    <p>Opp. Clarence Public School,</p>
                    <p>Bengaluru - 560078</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
