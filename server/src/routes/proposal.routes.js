import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createProposal,
  getProjectProposals,
  updateProposalStatus,
  getMyProposals,
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

router.put(
  "/:id/status",
  protect,
  updateProposalStatus
);

router.get(
  "/my-proposals",
  protect,
  getMyProposals
);

export default router;