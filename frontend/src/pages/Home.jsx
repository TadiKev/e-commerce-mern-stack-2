import React from "react";
import Hero from "../components/Hero";
import NewCollections from "../components/NewCollections";
import NewsLetter from "../components/NewsLetter";
import Offer from "../components/Offer";
import Popular from "../components/Popular";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Function to handle product click and navigate to the product page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <Hero />
      <Popular onClick={handleProductClick} />
      <Offer />
      <NewCollections onClick={handleProductClick} /> {/* Pass handleProductClick to NewCollections */}
      <NewsLetter />
    </>
  );
};

export default Home;
