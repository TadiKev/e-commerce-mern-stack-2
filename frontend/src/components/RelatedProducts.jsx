import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

import Item from "./Item";

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch the first 4 related products
    fetch("http://localhost:4000/relatedproducts")
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error("Error fetching related products:", error));
  }, []); // Only fetch once when component mounts

  const handleProductClick = (productId) => {
    // Scroll to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Navigate to the product page with the clicked product's id
    navigate(`/product/${productId}`);
  };

  return (
    <section className="bg-primary">
      <div className="max_padd_container py-12 xl:py-28 xl:w-[88%]">
        <h3 className="text-center">Related Products</h3>
        <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16" />
        {/* Container for items */}        
        <div className="grid grid-cols-1 sx:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
              onClick={() => handleProductClick(item.id)} // Pass click handler to each Item
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
