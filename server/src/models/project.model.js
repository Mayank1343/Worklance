import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    budget: {
      type: Number,
      required: true,
    },

    skillsRequired: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "open",
        "in_progress",
        "completed",
      ],
      default: "open",
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedFreelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model(
  "Project",
  projectSchema
);

export default Project;