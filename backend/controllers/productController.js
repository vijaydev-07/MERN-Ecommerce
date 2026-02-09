import productModel from "../models/productModel.js";

/**
 * ADD PRODUCT
 * expects JSON body
 * {
 *  name,
 *  description,
 *  price,
 *  category,
 *  subCategory,
 *  sizes: [],
 *  bestSeller: true/false,
 *  imageUrl: "https://..."
 * }
 */
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
      imageUrl
    } = req.body;

    if (!name || !price || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Name, price and imageUrl are required"
      });
    }

    const product = await productModel.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: Array.isArray(sizes) ? sizes : [],
      bestSeller: Boolean(bestSeller),
      imageUrl: imageUrl
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.log("Add product error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * GET ALL PRODUCTS
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.log("Get products error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * GET SINGLE PRODUCT
 */
const getSingleProduct = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.log("Get single product error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * DELETE PRODUCT
 */
const removeProduct = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    await productModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product removed"
    });
  } catch (error) {
    console.log("Remove product error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export {
  addProduct,
  getAllProducts,
  getSingleProduct,
  removeProduct
};
