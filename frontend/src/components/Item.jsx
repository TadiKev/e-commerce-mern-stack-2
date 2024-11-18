import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext"; // Import the ShopContext
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Item = ({ id, name, image, old_price, new_price }) => {
  // Access the addToCart function from the ShopContext
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate(); // Initialize useNavigate

  // Ensures the addToCart function is triggered
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(id); // Calls the addToCart function with the product ID
    } else {
      console.warn("addToCart function is not defined!");
    }
  };

  // Function to handle click and navigate to the product detail page
  const handleViewProduct = () => {
    // Scroll to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Navigate to the product page using product ID
    navigate(`/product/${id}`);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg">
      {/* Product Image Section */}
      <div className="relative flexCenter group overflow-hidden transition-all duration-100">
        {/* Search Icon */}
        <button
          onClick={handleAddToCart}
          className="h-14 w-12 bg-white rounded-full flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <FaSearch className="text-gray-600 hover:rotate-90 hover:scale-125 transition-all duration-200" />
        </button>

        {/* Product Image */}
        <img
          src={image}
          alt={name || "Product Image"}
          className="w-full block object-cover group-hover:scale-110 transition-all duration-1000 cursor-pointer"
          onClick={handleViewProduct} // Navigate to product page on image click
        />
      </div>

      {/* Product Info */}
      <div className="p-4 overflow-hidden">
        <h4 className="my-[16px] text-lg font-medium text-gray-900 line-clamp-2">{name}</h4>
        <div className="flex gap-5 items-center">
          <span className="text-lg font-bold text-gray-900">{new_price}.00</span>
          <span className="text-sm font-semibold text-gray-500 line-through">
            {old_price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default Item;
