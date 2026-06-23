import Proposal from "../models/proposal.model.js";
import Project from "../models/project.model.js";


// CREATE PROPOSAL
export const createProposal = async (
  req,
  res,
  next
) => {
  try {

    if (
        req.user.role !==
        "freelancer"
        ) {
        return res.status(403).json({
            success: false,
            message:
            "Only freelancers can submit proposals",
        });
        }

    const {
      projectId,
      coverLetter,
      proposedBudget,
    } = req.body;

    // Check project exists
    const project =
      await Project.findById(
        projectId
      );

    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Project not found",
      });
    }

    // Prevent duplicate proposal
    const existingProposal =
      await Proposal.findOne({
        project: projectId,
        freelancer:
          req.user._id,
      });

    if (existingProposal) {
      return res.status(400).json({
        success: false,
        message:
          "You already applied to this project",
      });
    }

    const proposal =
      await Proposal.create({
        project: projectId,

        freelancer:
          req.user._id,

        coverLetter,

        proposedBudget,
      });

    res.status(201).json({
      success: true,
      proposal,
    });

  } catch (error) {
    next(error);
  }
};


// GET PROPOSALS FOR PROJECT
export const getProjectProposals =
  async (
    req,
    res,
    next
  ) => {
    try {

      const proposals =
        await Proposal.find({
          project:
            req.params.projectId,
        })
          .populate(
            "freelancer",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        proposals,
      });

    } catch (error) {
      next(error);
    }
  };
  
  export const updateProposalStatus =
  async (
    req,
    res,
    next
  ) => {
    try {

      const {
        status,
      } = req.body;

      const proposal =
        await Proposal.findById(
          req.params.id
        ).populate("project");

      if (!proposal) {
        return res.status(404).json({
          success: false,
          message:
            "Proposal not found",
        });
      }

      // Only project owner can decide
      if (
        proposal.project.client.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "Not authorized",
        });
      }

      proposal.status =
        status;

      await proposal.save();

      // If accepted, update project
      if (
        status === "accepted"
      ) {
        await Project.findByIdAndUpdate(
        proposal.project._id,
        {
          status: "in_progress",

          assignedFreelancer:
            proposal.freelancer,
        }
      );

      await Proposal.updateMany(
      {
        project:
          proposal.project._id,

        _id: {
          $ne: proposal._id,
        },
      },
      {
        status: "rejected",
      }
    );
    }

      res.status(200).json({
        success: true,
        proposal,
      });

    } catch (error) {
      next(error);
    }
  };

  export const getMyProposals =
  async (
    req,
    res,
    next
  ) => {
    try {

      const proposals =
        await Proposal.find({
          freelancer:
            req.user._id,
        })
        .populate(
          "project",
          "title budget status"
        )
        .sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        proposals,
      });

    } catch (error) {
      next(error);
    }
  };
