import React, { useState, useEffect } from "react";
import { TbTrash } from "react-icons/tb";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      const result = await response.json();

      if (Array.isArray(result.data)) {
        setAllProducts(result.data);
      } else {
        console.error("API response data is not an array:", result.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      // Optional: Handle the response
      if (response.ok) {
        console.log("Product removed successfully");
        // Remove the product from the state immediately after the removal
        setAllProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        console.error("Failed to remove product:", response.statusText);
      }
    } catch (error) {
      console.error("Error while removing product:", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-10">
      <div className="lg:ml-60 w-full max-w-8xl p-4">
        <h4 className="text-2xl font-bold mb-4 text-center">Products List</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300">Product</th>
                <th className="p-2 border border-gray-300">Title</th>
                <th className="p-2 border border-gray-300">Old Price</th>
                <th className="p-2 border border-gray-300">New Price</th>
                <th className="p-2 border border-gray-300">Category</th>
                <th className="p-2 border border-gray-300">Remove</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allProducts) && allProducts.length > 0 ? (
                allProducts.map((product, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border border-gray-300">
                      <img
                        src={product.image}
                        alt={product.name || "Product Image"}
                        className="w-20 h-20 object-cover mx-auto"
                      />
                    </td>
                    <td className="p-2 border border-gray-300">
                      {product.name}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {product.old_price}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {product.new_price}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {product.category}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <button
                        onClick={() => remove_product(product.id)}
                        className="text-red-500"
                      >
                        <TbTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
