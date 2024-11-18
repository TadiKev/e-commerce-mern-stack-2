import React from "react";

const ProductDescription = () => {
  return (
    <div className="mt-16 px-4 lg:px-8 max-w-50xl mx-auto">
      <div className="flex gap-4 mb-6 border-b-2 border-gray-300 pb-4">
        <button className="bg-blue-700 text-white font-medium rounded-sm text-sm py-2 px-6 hover:bg-blue-800 transition-all">
          Description
        </button>
        <button className="border border-gray-300 rounded-sm text-sm py-2 px-6 text-gray-700 hover:text-blue-700 hover:border-blue-700 transition-all">
          Care Guide
        </button>
        <button className="border border-gray-300 rounded-sm text-sm py-2 px-6 text-gray-700 hover:text-blue-700 hover:border-blue-700 transition-all">
          Size Guide
        </button>
      </div>
      <div className="text-gray-800 leading-relaxed space-y-4 pb-16">
        <p className="text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam...
        </p>
        <p className="text-base">
          Class aptent taciti sociosqu ad litora torquent per conubia nostra...
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
