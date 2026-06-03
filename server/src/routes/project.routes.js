import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createProject,
  getProjects,
  getProjectById,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createProject
);

router.get(
  "/",
  getProjects
);

router.get(
  "/:id",
  getProjectById
);

export default router;