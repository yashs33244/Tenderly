import React from 'react';
import NavbarComponent from './Navbar';
import CreateTender from './CreateTender';
import HeroSection from './Hero';
import VerticalGrid from './VerticalGrid';
import Footer from './Footer';
import FeatureCard from './FeatureCard';
import Sidebar from './Sidebar';
import { useState, useEffect} from 'react';
import Dashboard from '../pages/Dashboard';


// Feature Card Component


// Footer Component


// Pricing Card Component
const PricingCard = ({ title, price, features }) => {
  return (
    <div className="bg-[#7CB9E8] rounded-lg p-6 text-center">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-4xl font-bold mb-6">${price}</p>
      <ul className="mb-6">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600 mb-2">
            {feature}
          </li>
        ))}
      </ul>
      <button className="bg-[#00308F] text-white font-bold py-2 px-4 rounded">
        Choose Plan
      </button>
    </div>
  );
};

// Main Component
const MainComponent = () => {

  const handleSubmit = () => {
    window.location = '/create-tender';
  }
  const handleCardClick = () => {
    window.location = '/dashboard';
  }
  const tendersData = [
    { id: 1, title: 'Tender 1', description: '...', deadline: '2024-09-25' },
    // ... Add more tender items
  ];

  return (
    <div className="bg-white">
      

      {/* <div className="container mx-auto p-8">
        <VerticalGrid tenders={tendersData} />
      </div> */}

      
        
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <NavbarComponent/>
      
      </div>
      <div className="pt-20 mx-auto ">
        <HeroSection />
      </div> 
      
      <div className="pt-20 mx-auto px-10 py-10">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to our E-Tender Platform</h1>
          <p className="text-gray-600 mb-8">Efficient Features for Seamless Tendering</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <FeatureCard
              
              title="Search Tenders"
              description="Easily search and find tenders based on your preferences."
              icon = "search"
            />
            <FeatureCard
              icon="submit"
              title="Submit Bids"
              description="Submit your bids for tenders with ease and efficiency."
            />
            <FeatureCard
              icon="price"
              title="Pricing"
              description="Flexible pricing plans to suit your business needs."
            />
            <FeatureCard
              onClick = {handleCardClick}
              icon="manage"
              title="Tender Management"
              description="Manage your tenders and bids in one centralized platform."
            />
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Choose the Right Plan for Your Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCard
              title="Basic"
              price="0"
              features={[
                'Access to limited tenders',
                'Basic bid submission',
                'Limited support',
              ]}
            />
            <PricingCard
              title="Standard"
              price="29"
              features={[
                'Access to all tenders',
                'Advanced bid submission',
                'Tender management tools',
                'Priority support',
              ]}
            />
            <PricingCard
              title="Premium"
              price="99"
              features={[
                'All features of Standard plan',
                'Dedicated account manager',
                'Customized reporting',
                'Premium support',
              ]}
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Streamline Your Tender Process with Us</h2>
          <button onClick = {handleSubmit} className="bg-[#0000FF] text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </div>
      <Footer />
      
    </div>
  );
};

export default MainComponent;