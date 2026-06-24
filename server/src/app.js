import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";

import projectRoutes
from "./routes/project.routes.js";

import proposalRoutes
from "./routes/proposal.routes.js";

dotenv.config();

const app = express();

console.log("CLIENT_URL =", process.env.CLIENT_URL);

// CORS FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://theworklance.vercel.app",
    ],
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
    ],
  })
);

// Security
// app.use(helmet());

// Logging
app.use(morgan("dev"));

// Parsers
app.use(express.json());
app.use(cookieParser());

// Health Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Worklance API Running",
  });
});

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/profile", profileRoutes);

app.use("/api/v1/projects", projectRoutes);

app.use("/api/v1/proposals", proposalRoutes);


app.use(errorMiddleware);

export default app;