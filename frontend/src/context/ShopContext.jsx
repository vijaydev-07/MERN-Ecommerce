import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets"; // इसे अब हम इस्तेमाल नहीं करेंगे
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios को इम्पोर्ट करना न भूलें

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]); // अब प्रोडक्ट्स का डेटा स्टेट में रहेगा
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]); // new

  const navigate = useNavigate();

  // .env से Backend URL ले रहे हैं
  const backendUrl = import.meta.env.VITE_BACKEND_URL; 
  const currency = "₹";
  const delivery_fee = 10;

  // --- Backend से प्रोडक्ट्स लाने का फंक्शन ---
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log('API Response:', response.data);
      if (response.data.success) {
        // normalize: ensure imageUrl exists and is absolute (prefix backendUrl for relative paths)
        const normalized = (response.data.products || []).map(p => {
          const raw = p.imageUrl || p.image || "";
          let imageUrl = raw || "";
          try {
            if (imageUrl && !/^https?:\/\//i.test(imageUrl)) {
              // make absolute using backendUrl if available
              const base = backendUrl ? backendUrl.replace(/\/$/, "") : "";
              if (base) {
                imageUrl = imageUrl.startsWith("/") ? `${base}${imageUrl}` : `${base}/${imageUrl}`;
              }
            }
          } catch (e) {
            imageUrl = raw || "";
          }
          return {
            ...p,
            imageUrl
          };
        });
        setProducts(normalized);
      } else {
        console.error('API Error:', response.data.message);
        toast.error(response.data.message || "Failed to load products");
      }
    } catch (error) {
      console.error('API Call Error:', error.message);
      toast.error("Server se डेटा लोड नहीं हो पाया - Check Backend");
    }
  };

  useEffect(() => {
    getProductsData();
  }, [backendUrl]);

  // ------------------------------------------

  // read stored cart safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      if (stored) setCartItems(JSON.parse(stored));
    } catch (e) {
      localStorage.removeItem("cartItems");
      setCartItems({});
    }
  }, []);

  // clear cart on logout event
  useEffect(() => {
    const onLogout = () => {
      setCartItems({});
      localStorage.removeItem("cartItems");
    };
    window.addEventListener("logout", onLogout);
    return () => window.removeEventListener("logout", onLogout);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // load orders on mount (try backend, then fallback to localStorage)
  useEffect(() => {
    const loadOrders = async () => {
      try {
        if (backendUrl) {
          const token = localStorage.getItem("token") || "";
          const res = await axios.get(`${backendUrl}/api/order/user`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          });
          if (res.data?.success && Array.isArray(res.data.orders)) {
            setOrders(res.data.orders);
            localStorage.setItem("orders", JSON.stringify(res.data.orders));
            return;
          }
        }
      } catch (e) {
        // ignore backend error and fallback
      }
      try {
        const local = JSON.parse(localStorage.getItem("orders") || "[]");
        setOrders(Array.isArray(local) ? local : []);
      } catch {
        setOrders([]);
      }
    };
    loadOrders();
  }, [backendUrl]);

  const addToCart = (itemId, size) => {
  if (!size) {
    toast.error("Please select a size");
    return;
  }

  setCartItems((prev) => {
    const updated = structuredClone(prev);

    // agar product already cart me hai
    if (updated[itemId]) {
      // same size hai → quantity badhao
      if (updated[itemId][size]) {
        updated[itemId][size] += 1;
        toast.success("Quantity Increased");
      } 
      // new size
      else {
        updated[itemId][size] = 1;
        toast.success("Item Added To Cart");
      }
    } 
    // new product
    else {
      updated[itemId] = {
        [size]: 1,
      };
      toast.success("Item Added To Cart");
    }

    return updated;
  });
};



  // updateQuantity: if quantity <= 0 remove that size; if no sizes left remove product entry
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) return;
    if (quantity <= 0) {
      // remove size entry
      delete cartData[itemId][size];
      // if no sizes left, remove product
      if (Object.keys(cartData[itemId] || {}).length === 0) {
        delete cartData[itemId];
      }
      toast.success("Item Removed From The Cart");
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  // remove specific size / item
  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) return;
    delete cartData[itemId][size];
    if (Object.keys(cartData[itemId] || {}).length === 0) {
      delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Removed from cart");
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  // placeOrder: add individual items to flat orders array
  const placeOrder = async (orderItems = []) => {
    const ordersKey = "orders";
    
    // flatten: add each item as individual entry with date
    const newOrderItems = orderItems.map((it) => ({
      ...it,
      date: Date.now(), // add order date to each item
    }));

    // try backend if available (optional, fallback to local)
    try {
      if (backendUrl) {
        const token = localStorage.getItem("token") || "";
        await axios.post(`${backendUrl}/api/order/add`, { items: newOrderItems }, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
    } catch (err) {
      // ignore backend errors - continue with local
    }

    // add to orders state (flat array)
    setOrders((prev) => {
      const next = [...newOrderItems, ...prev];
      try { localStorage.setItem(ordersKey, JSON.stringify(next)); } catch {}
      return next;
    });

    // remove ordered items from cart
    let cartData = structuredClone(cartItems);
    for (const it of orderItems) {
      if (cartData[it.productId]) {
        delete cartData[it.productId][it.size];
        if (Object.keys(cartData[it.productId] || {}).length === 0) {
          delete cartData[it.productId];
        }
      }
    }
    setCartItems(cartData);
    return { success: true };
  };

  // cancel order (state-level + backend attempt)
  const cancelOrder = async (orderId) => {
    // remove order locally (optimistic)
    setOrders((prev) => {
      const next = prev.filter((o) => o._id !== orderId);
      try { localStorage.setItem("orders", JSON.stringify(next)); } catch {}
      return next;
    });

    // try backend cancel (best-effort)
    try {
      if (backendUrl) {
        const token = localStorage.getItem("token") || "";
        await axios.patch(`${backendUrl}/api/order/${orderId}/cancel`, {}, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
    } catch (err) {
      // ignore backend errors; UI already updated
    }
  };

  // cancelItem: remove item at index from flat orders array
  const cancelItem = (itemIndex) => {
    setOrders((prev) => {
      const next = prev.filter((_, idx) => idx !== itemIndex);
      try { localStorage.setItem("orders", JSON.stringify(next)); } catch {}
      return next;
    });
  };

const getCartCount = () => {
  let totalCount = 0;

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      totalCount += cartItems[productId][size];
    }
  }

  return totalCount;
};

const isItemInCart = (itemId, size) => {
  return !!cartItems[itemId]?.[size];
};


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {
            console.error('Error calculating cart amount:', error);
          }
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    isItemInCart,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartAmount,
    placeOrder,
    orders,
    cancelItem, // exposed
    navigate,
    backendUrl // इसे भी पास कर रहे हैं ताकि बाकी जगह काम आए
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;