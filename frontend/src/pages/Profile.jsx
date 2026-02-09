import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  // auth context se user, backend url aur logout
  const { user, backendUrl, logout } = useContext(AuthContext);

  // user ke orders store karne ke liye
  const [orders, setOrders] = useState([]);

  // loading state (future use / spinner)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // page load hote hi user ke orders fetch
  useEffect(() => {
    const fetchOrders = async () => {
      // agar user ya backend hi nahi hai to kuch mat karo
      if (!user || !backendUrl) return;

      try {
        setLoading(true);

        // token localStorage se
        const token = localStorage.getItem("token");

        // backend se user ke orders la rahe
        const res = await axios.get(`${backendUrl}/api/order/user`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        // agar response sahi hai to orders state me set
        if (res.data?.success && Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        // error ignore, bas empty orders dikhenge
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, backendUrl]);

  // agar user login hi nahi hai
  if (!user) {
    return (
      <div className="pt-14 text-center text-gray-600">
        Please login to view your profile.
      </div>
    );
  }

  // logout button ka kaam
  const handleLogout = () => {
    logout();          // context se logout
    navigate("/login"); // login page pe bhejo
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center">
        
        {/* profile header */}
        <FaUserCircle size={64} className="text-gray-300 mb-2" />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          My Profile
        </h2>
        <p className="text-gray-500 mb-6 text-sm text-center">
          Manage your account and orders
        </p>

        {/* user info */}
        <div className="w-full bg-gray-50 rounded-xl p-5 mb-6 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-400" />
            <span className="font-medium text-gray-700">Name:</span>
            <span className="ml-1 text-gray-900">{user?.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-gray-400" />
            <span className="font-medium text-gray-700">Email:</span>
            <span className="ml-1 text-gray-900">{user?.email}</span>
          </div>
        </div>

        {/* buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3 mb-2">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition text-base"
          >
            View Orders
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 py-2 rounded-lg bg-white border border-red-400 text-red-500 font-semibold hover:bg-red-50 transition text-base"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
