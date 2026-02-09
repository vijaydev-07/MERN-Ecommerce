import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { user, backendUrl, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !backendUrl) return;
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backendUrl}/api/order/user`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        if (res.data?.success && Array.isArray(res.data.orders)) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        // ignore; show empty orders
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, backendUrl]);

  if (!user) {
    return (
      <div className="pt-14 text-center text-gray-600">
        Please login to view your profile.
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-8 px-2">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center">
        {/* Header */}
        <FaUserCircle size={64} className="text-gray-300 mb-2" />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h2>
        <p className="text-gray-500 mb-6 text-sm text-center">
          Manage your account and orders
        </p>
        {/* User Info Card */}
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
        {/* Action Buttons */}
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
