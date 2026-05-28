import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();


// Security Middleware
app.use(helmet());


// Logging Middleware
app.use(morgan("dev"));


// Body Parser
app.use(express.json());


// Cookie Parser
app.use(cookieParser());


// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Worklance API Running",
  });
});


// Error Middleware
app.use(errorMiddleware);

export default app;