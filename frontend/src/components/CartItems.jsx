import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

const CartItems = () => {
  const { all_products, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

  return (
    <section className="mt-10 py-16 px-6 xl:px-20 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Shopping Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {all_products.map((product) => {
              if (cartItems[product.id] && cartItems[product.id] > 0) {
                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 hover:bg-gray-20"
                  >
                    <td className="py-4 px-6 text-left">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 rounded-lg object-cover shadow-md"
                      />
                    </td>
                    <td className="py-4 px-6 text-left font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="py-4 px-6 text-left">
                      ${product.new_price.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-left">{cartItems[product.id]}</td>
                    <td className="py-4 px-6 text-left font-semibold text-gray-800">
                      ${(product.new_price * cartItems[product.id]).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-150"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              }
              return null; // If the product is not in the cart or has quantity 0
            })}
          </tbody>
        </table>

        <div className="mt-10 px-6 py-8 bg-gray-100 rounded-lg shadow-lg max-w-md mx-auto">
          {/* Summary Heading */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800">Summary</h4>
          </div>

          {/* Total Amount Details */}
          <div className="space-y-4">
            {/* Subtotal Section */}
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-600">Subtotal:</h4>
              <h4 className="text-sm font-semibold text-gray-800">
                ${getTotalCartAmount().toFixed(2)}
              </h4>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Shipping Fee Section */}
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-600">Shipping fee:</h4>
              <h4 className="text-sm font-semibold text-gray-800">Fee</h4>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Total Section */}
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-600">Total:</h4>
              <h4 className="text-lg font-semibold text-gray-900">
                ${getTotalCartAmount().toFixed(2)}
              </h4>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors">
            Checkout
          </button>

          {/* Coupon Code Section */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Enter coupon code here:
            </h4>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Coupon code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartItems;
