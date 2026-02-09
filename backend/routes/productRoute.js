import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  removeProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/list", getAllProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", removeProduct);

export default router;
