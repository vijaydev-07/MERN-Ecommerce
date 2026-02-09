import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const existing = await User.findOne({
      email
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // ❌ bcrypt.hash hata diya
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password // ✅ plain password
    });

    const token = jwt.sign({
        id: user._id
      },
      JWT_SECRET, {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
};


export const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign({
      id: user._id
    }, JWT_SECRET, {
      expiresIn: "7d"
    });

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};

export const me = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.json({
        success: true,
        user: null
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    res.json({
      success: true,
      user
    });
  } catch {
    res.json({
      success: true,
      user: null
    });
  }
};
