import { createContext, useEffect, useState } from "react";

// 1. Create the context
export const ShopContext = createContext(null);

// 2. Define a function to initialize default cart items
const defaultCartItems = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0; // Initialize quantities to 0 for each product
  }
  return cart;
};

// 3. Create the provider component
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(defaultCartItems());
  const [all_products, setAll_products] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch all products first
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        if (data?.success && Array.isArray(data.data)) {
          setAll_products(data.data);
        } else {
          console.error("Data is not in the expected format", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once data is fetched
      });

    // Fetch the cart data from the backend (if logged in)
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetch('http://localhost:4000/getcart', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'auth-token': token,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((cartData) => {
          console.log("Cart data received:", cartData);
          if (cartData) {
            setCartItems(cartData);  // cartData is likely an object, not an array
          }
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, []);

  // Add item to cart
  const addToCart = (itemId) => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      alert("Please log in to add items to the cart.");
      return;
    }

    fetch("http://localhost:4000/addtocart", {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item added to cart:", data);

        // Update the local state only on success
        setCartItems((prev) => {
          const newQuantity = (prev[itemId] || 0) + 1;
          return {
            ...prev,
            [itemId]: newQuantity,
          };
        });
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
      });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
        alert("Please log in to remove items from the cart.");
        return;
    }

    fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
            "auth-token": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        if (data.success) {
            console.log("Item removed from cart:", data);
            // Update local state based on backend's updated cart data
            setCartItems(data.cartData);
        } else {
            console.error("Failed to remove item:", data.message);
        }
    })
    .catch((error) => {
        console.error("Error removing item from cart:", error);
    });
};


  // Get total amount for all items in the cart
  const getTotalCartAmount = () => {
    if (!all_products.length) return 0; // Return 0 if products are not loaded yet

    let totalAmount = 0;
    Object.keys(cartItems).forEach((item) => {
      const quantity = cartItems[item];
      if (quantity > 0) {
        let itemInfo = all_products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * quantity;
        }
      }
    });
    return totalAmount;
  };

  // Get total number of items in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    Object.keys(cartItems).forEach((item) => {
      const quantity = cartItems[item];
      if (quantity > 0) {
        totalItems += quantity;
      }
    });
    return totalItems;
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    loading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
