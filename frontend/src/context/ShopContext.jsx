import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // basic states
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  // constants
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = "₹";
  const delivery_fee = 10;

  /* ---------------- PRODUCTS ---------------- */

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);

      if (!res.data?.success) {
        toast.error("Products load failed");
        return;
      }

      // make imageUrl safe
      const normalized = res.data.products.map((p) => {
        let imageUrl = p.imageUrl || p.image || "";
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `${backendUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
        }
        return { ...p, imageUrl };
      });

      setProducts(normalized);
    } catch {
      toast.error("Backend not responding");
    }
  };

  useEffect(() => {
    getProductsData();
  }, [backendUrl]);

  /* ---------------- CART STORAGE ---------------- */

  // load cart from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cartItems") || "{}");
      setCartItems(stored);
    } catch {
      setCartItems({});
    }
  }, []);

  // save cart
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ---------------- ORDERS ---------------- */

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const res = await axios.get(`${backendUrl}/api/order/user`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (res.data?.success) {
          setOrders(res.data.orders);
          localStorage.setItem("orders", JSON.stringify(res.data.orders));
          return;
        }
      } catch {}

      // fallback
      const localOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(localOrders);
    };

    loadOrders();
  }, [backendUrl]);

  /* ---------------- CART ACTIONS ---------------- */

  const addToCart = (itemId, size) => {
    if (!size) return toast.error("Select size first");

    setCartItems((prev) => {
      const updated = structuredClone(prev);

      if (!updated[itemId]) updated[itemId] = {};
      updated[itemId][size] = (updated[itemId][size] || 0) + 1;

      toast.success("Added to cart");
      return updated;
    });
  };

  const updateQuantity = (itemId, size, qty) => {
    const updated = structuredClone(cartItems);

    if (qty <= 0) {
      delete updated[itemId][size];
      if (!Object.keys(updated[itemId]).length) delete updated[itemId];
      toast.success("Item removed");
    } else {
      updated[itemId][size] = qty;
    }

    setCartItems(updated);
  };

  const removeFromCart = (itemId, size) => {
    updateQuantity(itemId, size, 0);
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  /* ---------------- ORDER ACTIONS ---------------- */

  const placeOrder = async (orderItems = []) => {
    const itemsWithDate = orderItems.map((i) => ({
      ...i,
      date: Date.now(),
    }));

    try {
      const token = localStorage.getItem("token") || "";
      await axios.post(
  `${backendUrl}/api/order/add`,
  {
    order: {
      items: itemsWithDate,
      total: itemsWithDate.reduce(
        (sum, it) => sum + it.price * it.quantity,
        0
      ),
      date: Date.now(),
    },
  },

        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
    } catch {}

    setOrders((prev) => {
      const next = [...itemsWithDate, ...prev];
      localStorage.setItem("orders", JSON.stringify(next));
      return next;
    });

    clearCart();
    return { success: true };
  };

  const cancelItem = (index) => {
    setOrders((prev) => {
      const next = prev.filter((_, i) => i !== index);
      localStorage.setItem("orders", JSON.stringify(next));
      return next;
    });
  };

  /* ---------------- HELPERS ---------------- */

  const getCartCount = () => {
    let count = 0;
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        count += cartItems[id][size];
      }
    }
    return count;
  };

  const isItemInCart = (id, size) => !!cartItems[id]?.[size];

  const getCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;

      for (const size in cartItems[id]) {
        total += product.price * cartItems[id][size];
      }
    }
    return total;
  };

  /* ---------------- CONTEXT VALUE ---------------- */

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartAmount,
    isItemInCart,
    placeOrder,
    orders,
    cancelItem,
    navigate,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
