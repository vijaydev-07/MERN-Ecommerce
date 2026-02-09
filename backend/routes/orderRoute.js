import express from "express";
import { addOrder, getUserOrders, cancelOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/add", addOrder);
router.get("/user", getUserOrders);
router.patch("/:id/cancel", cancelOrder);

export default router;
