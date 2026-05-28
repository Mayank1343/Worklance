import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
  refreshAccessToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post("/logout", protect, logoutUser);

router.post("/refresh-token", refreshAccessToken);

export default router;