import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createProposal,
  getProjectProposals,
} from "../controllers/proposal.controller.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  createProposal
);

router.get(
  "/project/:projectId",
  protect,
  getProjectProposals
);

export default router;