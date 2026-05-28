import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  try {

    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

    }

    // No token
    if (!token) {

      const error = new Error("Not authorized, no token");

      error.statusCode = 401;

      throw error;

    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach user to request
    req.user = await User.findById(decoded.userId).select("-password");

    next();

  } catch (error) {

    error.statusCode = 401;

    next(error);

  }
};

export default protect;