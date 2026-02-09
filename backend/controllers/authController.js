import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const signup = async (req, res) => {
  try {
    // request body
    const { name, email, password } = req.body;

    // basic check
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    // user already exists
    const existing = await User.findOne({
      email
    });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    // create user
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password,
    });

    // generate token
    const token = jwt.sign({
      id: user._id
    }, JWT_SECRET, {
      expiresIn: "7d"
    });

    // response
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Signup failed"
    });
  }
};

export const login = async (req, res) => {
  try {
    // request body
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    // find user
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // password check
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // token
    const token = jwt.sign({
      id: user._id
    }, JWT_SECRET, {
      expiresIn: "7d"
    });

    // response
    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};

export const me = async (req, res) => {
  try {
    // get token
    const token = req.headers.authorization?.split(" ")[1];

    // no token
    if (!token) {
      return res.json({
        success: true,
        user: null
      });
    }

    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // fetch user
    const user = await User.findById(decoded.id).select("-password");

    res.json({
      success: true,
      user
    });
  } catch {
    // invalid token
    res.json({
      success: true,
      user: null
    });
  }
};
