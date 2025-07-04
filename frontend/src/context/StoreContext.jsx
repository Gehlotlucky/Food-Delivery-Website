import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";

  // Add item to cart - safe update
  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const currentCart = prev || {};
      if (!currentCart[itemId]) {
        return { ...currentCart, [itemId]: 1 };
      } else {
        return { ...currentCart, [itemId]: currentCart[itemId] + 1 };
      }
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Add to cart API error:", error);
      }
    }
  };

  // Remove item from cart - safe update
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const currentCart = prev || {};
      if (currentCart[itemId] > 1) {
        return { ...currentCart, [itemId]: currentCart[itemId] - 1 };
      } else {
        // Remove item completely if quantity <= 1
        const { [itemId]: _, ...rest } = currentCart;
        return rest;
      }
    });

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      } catch (error) {
        console.error("Remove from cart API error:", error);
      }
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch all food items from backend
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Fetch food list error:", error);
    }
  };

  // Load cart data from backend safely
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      const cartData = response.data.cartData;
      setCartItems(cartData && typeof cartData === "object" ? cartData : {});
    } catch (error) {
      console.error("Load cart data error:", error);
      setCartItems({});
    }
  };

  // Load data on mount
  useEffect(() => {
    async function initData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    initData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
