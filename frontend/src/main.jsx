import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import ShopContextProvider from "./context/ShopContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ShopContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
