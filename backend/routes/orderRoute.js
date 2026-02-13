import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    addOrder,
    getUserOrders,
    cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/add", authMiddleware, addOrder);
router.get("/user", authMiddleware, getUserOrders);
router.patch("/:id/cancel", authMiddleware, cancelOrder);

export default router;