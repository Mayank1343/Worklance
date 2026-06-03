import { useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjectById,
  updateProject,
} from "../../features/project/projectSlice";

const EditProject = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    selectedProject,
    isLoading,
  } = useAppSelector(
    (state) => state.project
  );

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      budget: "",
      skillsRequired: "",
    });

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        title:
          selectedProject.title || "",

        description:
          selectedProject.description || "",

        budget:
          selectedProject.budget || "",

        skillsRequired:
          selectedProject.skillsRequired?.join(
            ", "
          ) || "",
      });
    }
  }, [selectedProject]);

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
          updateProject({
            id,
            projectData,
          })
        );

      if (
        updateProject.fulfilled.match(
          resultAction
        )
      ) {
        navigate(
          `/projects/${id}`
        );
      }
    };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Edit Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="skillsRequired"
          value={
            formData.skillsRequired
          }
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          disabled={isLoading}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          {isLoading
            ? "Updating..."
            : "Update Project"}
        </button>

      </form>

    </div>
  );
};

export default EditProject;