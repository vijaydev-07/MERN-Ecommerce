import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";

// Create express app
const app = express();
const port = process.env.PORT || 4000;

// --- MIDDLEWARES ---
app.use(cors({
  origin: "*", // mobile + pc dono allow
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// --- ROUTES ---
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

// --- DEFAULT ROUTE ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- START SERVER ---
const start = async () => {
  try {
    await connectDB();
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Server start failed:", err);
  }
};

start();
