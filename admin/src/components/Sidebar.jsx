import React from 'react';
import { Link } from 'react-router-dom';
import addProduct from '../assets/addProduct.png';
import listProduct from '../assets/productlist.png';

const Sidebar = () => {
  return (
    <div className="w-full bg-green-50 flex flex-col items-center p-4 sm:fixed sm:top-0 sm:left-0 sm:w-44 sm:h-full sm:flex-col sm:justify-start sm:pt-20 sm:gap-4 sm:pl-6 lg:w-60 lg:flex lg:flex-col lg:justify-start lg:pl-6">
      <div className="flex gap-4 mb-4 sm:flex-col">
        <Link to="/addproduct">
          <button className="flex items-center justify-center rounded-md bg-primary h-14 w-36 medium-16 sm:h-12 sm:w-40 sm:text-xs lg:h-16 lg:w-48 lg:text-lg">
            <img src={addProduct} alt="Add Product" height={55} width={55} className="mr-2" />
            <span>Add Product</span>
          </button>
        </Link>

        <Link to="/listproduct">
          <button className="flex items-center justify-center rounded-md bg-primary h-14 w-36 medium-16 sm:h-12 sm:w-40 sm:text-xs lg:h-16 lg:w-48 lg:text-lg">
            <img src={listProduct} alt="Product List" height={55} width={55} className="mr-2" />
            <span>Product List</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
