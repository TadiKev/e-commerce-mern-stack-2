import React from 'react';

const Offer = () => {
  return (
    <section className="bg-banneroffer bg-cover bg-center w-full px-4 py-24 mt-16">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide leading-tight">
          Summer Sale 50%
        </h1>
        <h3 className="text-lg md:text-2xl font-medium text-white">
          Men's Leather Formal Wear
        </h3>
        <button className="mt-6 px-8 py-3 bg-yellow-400 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105">
          Go to store
        </button>   
      </div>
    </section>
  );
};

export default Offer;
