import Project from "../models/project.model.js";


// CREATE PROJECT
export const createProject = async (
  req,
  res,
  next
) => {
  try {

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
      );

    if (!project) {
      const error =
        new Error(
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