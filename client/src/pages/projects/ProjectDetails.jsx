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

import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

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
  return <Loader />;
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
    <PageContainer>

      <h1 className="text-3xl font-bold mb-6">
        {selectedProject.title}
      </h1>

      <Card className="space-y-5">

        <p className="mb-4">
          <span className="font-semibold">
            Budget:
          </span>{" "}
          ₹{selectedProject.budget}
        </p>

          <div>
            <h3 className="text-sm text-gray-500">
              Budget
            </h3>

            <p className="text-xl font-semibold">
              ₹ {selectedProject.budget}
            </p>
          </div>
          <span className="font-semibold">
            Status:
          </span>{" "}
            <span
              className="
                px-3 py-1 rounded-full
                bg-green-100 text-green-700
              "
            >
              {selectedProject.status
                .replace("_", " ")
                .toUpperCase()}
            </span>
        </Card>

        <div className="mb-4">
          <span className="font-semibold">
            Skills Required:
          </span>

          <div className="flex flex-wrap gap-2 mt-2">
            {selectedProject.skillsRequired?.map(
              (skill) => (
                <span
                  key={skill}
                  className="
                  bg-blue-100
                  text-blue-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                "
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

          <h2 className="font-semibold mb-3">
            Posted By
          </h2>

          <p>
            {selectedProject.client?.name}
          </p>

          <p className="text-gray-600">
            {selectedProject.client?.email}
          </p>
        </div>
        
        <div className="flex gap-3 mt-6">
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>


      {
        user?._id ===
          selectedProject?.client?._id && (
          <>
          <Link
            to={`/projects/edit/${selectedProject._id}`}
          >
            <Button>
              Edit Project
            </Button>
          </Link>

            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )
      }
      </div>

    </PageContainer>
  );
};

export default ProjectDetails;