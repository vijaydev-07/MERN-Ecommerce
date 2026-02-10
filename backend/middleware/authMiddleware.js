import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET missing in env");
}

const authMiddleware = async (req, res, next) => {
  try {
    // token read
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ?
      authHeader.split(" ")[1] :
      authHeader;
    // no token
    if (!token) {
      req.user = null;
      return next();
    }
    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.id) {
      req.user = null;
      return next();
    }
    // fetch user
    const user = await User.findById(decoded.id).select("_id name email");
    req.user = user || null;
    req.userId = decoded.id;
    next();
  } catch {
    // invalid token
    req.user = null;
    next();
  }
};

export default authMiddleware;