import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjectById,
  deleteProject,
} from "../../features/project/projectSlice";

import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    selectedProject,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.project
  );

  const { user } = useAppSelector(
  (state) => state.auth
  );

  const handleDelete =
  async () => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmed) return;

    const resultAction =
      await dispatch(
        deleteProject(
          selectedProject._id
        )
      );

    if (
      deleteProject.fulfilled.match(
        resultAction
      )
    ) {
      navigate("/projects");
    }
  };

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        {error}
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="p-6">
        Project not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        {selectedProject.title}
      </h1>

      <div className="bg-white shadow rounded-lg p-6">

        <p className="mb-4">
          <span className="font-semibold">
            Budget:
          </span>{" "}
          ₹{selectedProject.budget}
        </p>

        <p className="mb-4">
          <span className="font-semibold">
            Status:
          </span>{" "}
            <span
              className="
                px-3 py-1 rounded-full
                bg-green-100 text-green-700
              "
            >
              {selectedProject.status}
            </span>
        </p>

        <div className="mb-4">
          <span className="font-semibold">
            Skills Required:
          </span>

          <div className="flex flex-wrap gap-2 mt-2">
            {selectedProject.skillsRequired?.map(
              (skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold mb-2">
            Description
          </h2>

          <p>
            {selectedProject.description}
          </p>
        </div>

        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">
            Client Information
          </h2>

          <p>
            {selectedProject.client?.name}
          </p>

          <p className="text-gray-600">
            {selectedProject.client?.email}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Back
        </button>

      </div>

      {
        user?._id ===
          selectedProject?.client?._id && (
          <>
            <Link
              to={`/projects/edit/${selectedProject._id}`}
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit Project
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded ml-2"
            >
              Delete
            </button>
          </>
        )
      }

    </div>
  );
};

export default ProjectDetails;