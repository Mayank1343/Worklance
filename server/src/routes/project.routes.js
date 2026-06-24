import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  completeProject,
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

router.put(
  "/:id",
  protect,
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

router.put(
  "/:id/complete",
  protect,
  completeProject
);

router.patch(
  "/:id/complete",
  protect,
  completeProject
);

export default router;