import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import product_rt_1 from "../assets/product_rt_1.png";
import product_rt_2 from "../assets/product_rt_2.png";
import product_rt_3 from "../assets/product_rt_3.png";
import product_rt_4 from "../assets/product_rt_4.png";
import { MdStar } from "react-icons/md";
import { ShopContext } from "../Context/ShopContext"; // Ensure 'context' is lowercase

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigate to the product details page
  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);  // Navigate to the product page using product id
  };

  const handleAddToCart = () => {
    const itemId = product.id;  // Here we use 'itemId' (product.id)
    addToCart(itemId); // Pass itemId to the addToCart function
  };

  return (
    <section className="py-16 px-6 xl:px-20 bg-white max-w-50xl mx-auto">
      <div className="flex flex-col gap-12 xl:flex-row items-start">
        {/* Product Thumbnails */}
        <div className="flex gap-3 xl:flex-col xl:gap-4">
          {[product_rt_1, product_rt_2, product_rt_3, product_rt_4].map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Thumbnail ${index + 1}`}
              className="w-24 h-24 rounded-lg border border-gray-300 hover:shadow-md transition-shadow"
              onClick={handleViewProduct}  // Trigger navigate when thumbnail is clicked
            />
          ))}
        </div>
        
        {/* Main Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] rounded-lg shadow-lg object-cover"
            onClick={handleViewProduct}  // Trigger navigate when main image is clicked
          />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
          
          {/* Star Rating */}
          <div className="flex items-center text-yellow-500 space-x-1">
            {[...Array(4)].map((_, i) => (
              <MdStar key={i} className="h-5 w-5" />
            ))}
          </div>
          
          {/* Price */}
          <div className="flex items-center space-x-4 text-lg">
            <span className="text-gray-500 line-through">${product.old_price}</span>
            <span className="text-blue-600 font-bold text-2xl">${product.new_price}</span>
          </div>
          
          {/* Size Selector */}
          <div className="flex items-center gap-3">
            <h4 className="text-lg font-medium text-gray-900">Select Size:</h4>
            {["S", "M", "L", "XL"].map((size) => (
              <div
                key={size}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {size}
              </div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button 
              className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-blue-700 transition-all"
              onClick={handleAddToCart} // Updated onClick
            >
              Add To Cart
            </button>
            <button className="bg-green-500 text-white font-semibold rounded-lg px-6 py-3 hover:bg-green-600 transition-all">
              Buy It Now
            </button>
          </div>
          
          {/* Additional Information */}
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Category:</span> Woman | Jacket | Winter
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Tags:</span> Modern | Latest
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplay;
