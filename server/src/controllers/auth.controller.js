import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import generateToken from "../utils/generateToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";



// REGISTER USER
export const registerUser = async (req, res, next) => {
  try {

    const { name, email, password, role } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate tokens
    const accessToken = generateToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;

    await user.save();

    // Store refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",

      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};




// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatched) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // Generate tokens
    const accessToken = generateToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;

    await user.save();

    // Send cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",

      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};

  // GET CURRENT USER
export const getMe = async (req, res, next) => {
  try {

    res.status(200).json({
      success: true,
      user: req.user,
    });

  } catch (error) {
    next(error);
  }
};

// LOGOUT USER
export const logoutUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.user._id);

    user.refreshToken = "";

    await user.save();

    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {
    next(error);
  }
};

// REFRESH ACCESS TOKEN
export const refreshAccessToken = async (req, res, next) => {
  try {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {

      const error = new Error("Refresh token missing");

      error.statusCode = 401;

      throw error;

    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {

      const error = new Error("Invalid refresh token");

      error.statusCode = 401;

      throw error;

    }

    const newAccessToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });

  } catch (error) {
    next(error);
  }
};

// ADMIN TEST ROUTE
export const adminOnly = async (req, res, next) => {
  try {

    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });

  } catch (error) {
    next(error);
  }
};