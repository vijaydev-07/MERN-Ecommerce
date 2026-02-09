import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const MyOrders = () => {
  const { user, backendUrl } = useContext(AuthContext);
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      if (backendUrl) {
        const token = localStorage.getItem("token") || "";
        const res = await axios.get(`${backendUrl}/api/order/user`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.data?.success) {
          setOrders(res.data.orders || []);
        } else {
          setOrders([]);
        }
      } else {
        const local = JSON.parse(localStorage.getItem("orders") || "[]");
        setOrders(local || []);
      }
    } catch (err) {
      const local = JSON.parse(localStorage.getItem("orders") || "[]");
      setOrders(local || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, backendUrl]);

  const handleCancel = async (orderId) => {
    try {
      if (backendUrl) {
        const token = localStorage.getItem("token") || "";
        const res = await axios.patch(
          `${backendUrl}/api/order/${orderId}/cancel`,
          {},
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        if (res.data?.success) {
          setOrders((prev) =>
            prev.map((o) => (o._id === orderId ? res.data.order : o))
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="pt-14 text-center">Loading...</div>;
  if (!orders.length)
    return <div className="pt-14 text-center text-gray-600">No orders found</div>;

  return (
    <div className="pt-14 px-3 md:px-0">
      <div className="mb-4 text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="p-4 border rounded bg-white"
          >
            {/* TOP SECTION */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
              <div>
                <p className="font-medium text-sm md:text-base">
                  Order ID: {o._id}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  Date:{" "}
                  {new Date(
                    o.date || o.createdAt || Date.now()
                  ).toLocaleString()}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-semibold">
                    {o.status || "Placed"}
                  </span>
                </p>
              </div>

              <div className="md:text-right">
                <p className="text-lg font-semibold">
                  {currency}
                  {Number(o.total || 0).toLocaleString()}
                </p>

                {o.status !== "Cancelled" && (
                  <button
                    onClick={() => handleCancel(o._id)}
                    className="mt-2 w-full md:w-auto px-3 py-1 text-sm text-white bg-red-600 rounded"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* ITEMS */}
            <div className="mt-4">
              <p className="font-medium text-sm mb-2">Items:</p>
              <ul className="space-y-1">
                {(Array.isArray(o.items) ? o.items : []).map((it, idx) => (
                  <li
                    key={idx}
                    className="text-xs md:text-sm text-gray-700 leading-relaxed"
                  >
                    {it.productId} • Size: {it.size || "-"} • Qty:{" "}
                    {it.quantity} • {currency}
                    {Number(it.price || 0).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
