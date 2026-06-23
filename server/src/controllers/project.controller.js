import Project from "../models/project.model.js";

// CREATE PROJECT
export const createProject = async (
  req,
  res,
  next
) => {
  try {
    if (
      req.user.role !==
      "client"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Only clients can create projects",
      });
    }

    const {
      title,
      description,
      budget,
      skillsRequired,
    } = req.body;

    const project =
      await Project.create({
        title,
        description,
        budget,
        skillsRequired,

        client: req.user._id,
      });

    res.status(201).json({
      success: true,
      project,
    });

  } catch (error) {
    next(error);
  }
};


// GET ALL PROJECTS
export const getProjects = async (
  req,
  res,
  next
) => {
  try {

    const projects =
      await Project.find()
        .populate(
        "client",
        "name email"
      )
      .populate(
        "assignedFreelancer",
        "name email"
      )
        .sort({
          createdAt: -1,
        });

    res.status(200).json({
      success: true,
      projects,
    });

  } catch (error) {
    next(error);
  }
};


// GET SINGLE PROJECT
export const getProjectById = async (
  req,
  res,
  next
) => {
  try {

    const project =
      await Project.findById(
        req.params.id
      ).populate(
        "client",
        "name email"
      )
      .populate(
        "assignedFreelancer",
        "name email"
      )

    if (!project) {
      const error = new Error(
        "Project not found"
      );

      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      success: true,
      project,
    });

  } catch (error) {
    next(error);
  }
};

  // UPDATE PROJECT
export const updateProject = async (
  req,
  res,
  next
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      const error =
        new Error(
          "Project not found"
        );

      error.statusCode = 404;

      throw error;
    }

    // Ownership Check
    if (
      project.client.toString() !==
      req.user._id.toString()
    ) {
      const error =
        new Error(
          "Not authorized"
        );

      error.statusCode = 403;

      throw error;
    }

    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      project: updatedProject,
    });

  } catch (error) {
    next(error);
  }
};

// DELETE PROJECT
export const deleteProject = async (
  req,
  res,
  next
) => {
  try {

    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      const error =
        new Error(
          "Project not found"
        );

      error.statusCode = 404;

      throw error;
    }

    // Ownership Check
    if (
      project.client.toString() !==
      req.user._id.toString()
    ) {
      const error =
        new Error(
          "Not authorized"
        );

      error.statusCode = 403;

      throw error;
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Project deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};