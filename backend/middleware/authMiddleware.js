import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

const authMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || req.headers.Authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
    if (!token) {
      req.user = null;
      return next();
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) {
      req.user = null;
      return next();
    }
    const user = await User.findById(decoded.id);
    req.user = user ? { _id: user._id, name: user.name, email: user.email } : null;
    req.userId = decoded.id;
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    req.user = null;
    return next();
  }
};

export default authMiddleware;
