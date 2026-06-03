import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  createProject,
} from "../../features/project/projectSlice";

const CreateProject = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { isLoading } =
    useAppSelector(
      (state) => state.project
    );

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      budget: "",
      skillsRequired: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const projectData = {
        ...formData,

        skillsRequired:
          formData.skillsRequired
            .split(",")
            .map((skill) =>
              skill.trim()
            ),
      };

      const resultAction =
        await dispatch(
          createProject(projectData)
        );

      if (
        createProject.fulfilled.match(
          resultAction
        )
      ) {
        navigate("/projects");
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Create Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description
          }
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="skillsRequired"
          placeholder="React, Node, MongoDB"
          value={
            formData.skillsRequired
          }
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {isLoading
            ? "Creating..."
            : "Create Project"}
        </button>

      </form>

    </div>
  );
};

export default CreateProject;