import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "./context/AuthContext";

// protected route wrapper
// login hai to page dikhao, warna login pe bhejo
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  // auth state load ho raha hai
  if (loading) return <div className="pt-14 text-center">Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* toast notifications */}
      <ToastContainer />

      {/* common navbar */}
      <NavBar />

      {/* app routes */}
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* orders (usually protected, but left as-is) */}
        <Route path="/orders" element={<Orders />} />
      </Routes>

      {/* common footer */}
      <Footer />
    </div>
  );
};

export default App;
