import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // To navigate to the product page
import Item from "../components/Item";
import { ShopContext } from "../Context/ShopContext";

const Category = ({ category, banner }) => {
  const { all_products, addToCart } = useContext(ShopContext);
  const navigate = useNavigate(); // Hook for navigation

  // Handle product click: navigates to the product page
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Add product to cart
  const handleAddToCart = (productId) => {
    addToCart(productId); // Add the product to the cart
  };

  if (!Array.isArray(all_products) || all_products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <section className="max_padd_container py-12 xl:py-28">
      <div>
        {/* Banner Section */}
        <div>
          <img src={banner} alt="Banner" className="block my-7 mx-auto" />
        </div>

        {/* Products Count */}
        <div className="flexBetween my-8">
          <h5 className="text-lg font-semibold text-slate-700">
            Showing 1-12{" "}
            <span className="font-normal text-slate-500">
              out of {all_products.length} products
            </span>
          </h5>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sx:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {all_products.map((item) => {
            const normalizedCategory = item.category.trim().toLowerCase();
            const normalizedUserCategory = category.trim().toLowerCase();

            // Match category (singular/plural handling)
            if (
              normalizedUserCategory === normalizedCategory ||
              normalizedUserCategory === normalizedCategory.slice(0, -1)
            ) {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  onClick={(productId) => {
                    handleProductClick(productId); 
                    handleAddToCart(productId);
                  }}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </section>
  );
};

export default Category;
