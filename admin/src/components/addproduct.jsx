import React, { useState } from 'react';
import upload_area from '../assets/upload_area.svg';
import { MdAdd } from 'react-icons/md';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });
  const [message, setMessage] = useState(null); // Success/Error message
  const [messageType, setMessageType] = useState(''); // Type of message: 'success' or 'error'

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    let responseData;
    let product = { ...productDetails };

    if (!product.name || !product.category || !product.new_price || !image) {
      setMessageType('error');
      setMessage('All fields are required!');
      return;
    }

    let formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('new_price', product.new_price);
    formData.append('old_price', product.old_price);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:4000/addproduct', {  // Corrected endpoint URL
        method: 'POST',
        body: formData,
      });

      responseData = await response.json();

      if (responseData.success) {
        setMessageType('success');
        setMessage('Product added successfully!');
        setProductDetails({
          name: "",
          image: "",
          category: "",
          new_price: "",
          old_price: "",
        });
        setImage(null);
      } else {
        throw new Error(responseData.message || 'Failed to add product');
      }
    } catch (error) {
      setMessageType('error');
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8 box-border bg-white rounded-lg shadow-lg w-full mt-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Add New Product</h2>

      <div className="mb-6">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Product Title:</label>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Enter product title"
          className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="old_price" className="block text-lg font-medium text-gray-700 mb-2">Old Price:</label>
        <input
          value={productDetails.old_price}
          onChange={changeHandler}
          type="text"
          name="old_price"
          placeholder="Enter old price"
          className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="new_price" className="block text-lg font-medium text-gray-700 mb-2">Offer Price:</label>
        <input
          value={productDetails.new_price}
          onChange={changeHandler}
          type="text"
          name="new_price"
          placeholder="Enter new price"
          className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-2">Product Category:</label>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          id="category"
          className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Select a category</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="file-input" className="block text-lg font-medium text-gray-700 mb-2 text-center cursor-pointer">
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="Upload" className="w-24 h-24 mx-auto" />
          <span className="block text-blue-600 mt-2">Upload Product Image</span>
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
          className="bg-gray-100 border border-gray-300 outline-none w-full py-3 px-4 rounded-md"
        />
      </div>

      <button
        onClick={handleAddProduct} // Corrected function name
        type="submit"
        className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300"
      >
        <MdAdd className="text-2xl" />
        Add Product
      </button>
      
      {message && (
        <p className={`mt-4 text-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddProduct;
