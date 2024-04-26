import React from 'react';

function HeroSection2() {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white min-h-[25vh] flex items-center justify-center py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Revolutionize Your Tendering Process
        </h1>
        <p className="text-lg mb-10 max-w-lg mx-auto">
          Unlock the potential of your business with a modern and streamlined approach to finding, submitting, and managing tenders. Say goodbye to complex paperwork and embrace efficiency.
        </p>
        <div className="flex justify-center mb-10">
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 mr-4">
            Start Now
          </button>
          <button className="bg-transparent text-white font-bold py-3 px-8 rounded-lg border border-white hover:bg-white hover:text-blue-700 transition-colors duration-300">
            Learn More
          </button>
        </div>
        {/* <div className="flex justify-center">
          <img
            src="/hero-illustration.svg"
            alt="Hero Illustration"
            className="max-w-lg"
          />
        </div> */}
      </div>
    </section>
  );
}

export default HeroSection2;