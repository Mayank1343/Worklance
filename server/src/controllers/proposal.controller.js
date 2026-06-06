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