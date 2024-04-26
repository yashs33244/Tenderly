import React from 'react';
import HeroSection2 from '../components/HeroSection2';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Main Component
const HowItWorks = () => {
  const handleSubmit = () => {
    window.location = '/create-tender';
  }

  const tendersData = [
    { id: 1, title: 'Tender 1', description: '...', deadline: '2024-09-25' },
    // ... Add more tender items
  ];

  return (
    <div className="bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>
      <div className="pt-20 mx-auto ">
        <HeroSection2 />
      </div>
      <div className="pt-20 mx-auto px-10 py-10">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to our E-Tender Platform</h1>
          <p className="text-gray-600 mb-8">Efficient Features for Seamless Tendering</p>
        </div>

        {/* E-Tendering Process Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How E-Tendering Works</h2>
          <ol className="list-decimal ml-8">
            <li className="mb-4">
              <span className="font-bold">Create a Tender:</span> Government agencies or organizations can create and publish tenders on the platform, specifying the requirements, deadlines, and evaluation criteria.
            </li>
            <li className="mb-4">
              <span className="font-bold">Browse and Bid:</span> Suppliers or interested parties can browse through the published tenders and submit their bids electronically.
            </li>
            <li className="mb-4">
              <span className="font-bold">Evaluation and Selection:</span> The platform facilitates the evaluation of submitted bids based on the predefined criteria, allowing for fair and transparent selection of the successful bidder.
            </li>
            <li className="mb-4">
              <span className="font-bold">Contract Management:</span> Once the winning bidder is selected, the platform can assist with contract management, including document exchange, communication, and tracking of deliverables.
            </li>
          </ol>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Streamline Your Tender Process with Us</h2>
          <button onClick={handleSubmit} className="bg-[#0000FF] text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HowItWorks;