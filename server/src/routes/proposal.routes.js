import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createProposal,
  getProjectProposals,
  updateProposalStatus,
  getMyProposals,
  getClientProposals,
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

router.get(
  "/client-proposals",
  protect,
  getClientProposals
);

export default router;