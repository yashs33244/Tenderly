import React from 'react';

function HeroSection() {
  return (
    <section className="bg-blue-900 text-white min-h-[60vh] flex items-center justify-center py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Browse Our Latest Tenders
        </h1>
        <p className="text-lg mb-10 max-w-md mx-auto">
          Explore our collection of recently published tenders and seize new opportunities for your business.
        </p>
        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded hover:bg-blue-700">
          View Tenders
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
