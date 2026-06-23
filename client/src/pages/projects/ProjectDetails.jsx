import { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjectById,
  deleteProject,
  completeProject,
} from "../../features/project/projectSlice";

import { useParams, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import Card from "../../components/ui/Card";
import PageContainer from "../../components/ui/PageContainer";
import Loader from "../../components/ui/Loader";
import Button from "../../components/ui/Button";

import { useState } from "react";

import {
  createProposal,
} from "../../features/proposal/proposalSlice";

import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";

import {
  getProjectProposals,
} from "../../features/proposal/proposalSlice";

import {
  updateProposalStatus,
} from "../../features/proposal/proposalSlice";

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

  const {
  proposals,
} = useAppSelector(
  (state) => state.proposal
);

  const [proposalData, setProposalData] =
  useState({
    coverLetter: "",
    proposedBudget: "",
  });

  const handleProposalChange = (
  e
  ) => {
    setProposalData({
      ...proposalData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleProposalSubmit =
  async (e) => {
    e.preventDefault();

    await dispatch(
      createProposal({
        projectId:
          selectedProject._id,

        ...proposalData,
      })
    );
  };

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

  const handleStatusUpdate =
  async (
    proposalId,
    status
  ) => {

    await dispatch(
      updateProposalStatus({
        proposalId,
        status,
      })
    );

    dispatch(
      getProjectProposals(id)
    );
  };

  const handleComplete =
  async () => {

    await dispatch(
      completeProject(
        selectedProject._id
      )
    );
  };

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch, id]);

  useEffect(() => {
  dispatch(
    getProjectProposals(id)
  );
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

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900">
        {selectedProject.title}
      </h1>

      <p className="text-gray-500 mt-2">
        Project Details & Proposal Management
      </p>
    </div>

    {/* Freelancer Proposal Form */}
    {user?.role === "freelancer" && (
      <Card className="mb-8 p-6 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-5">
          Apply for this Project
        </h2>

        <form
          onSubmit={handleProposalSubmit}
          className="space-y-4"
        >
          <TextArea
            label="Cover Letter"
            name="coverLetter"
            value={proposalData.coverLetter}
            onChange={handleProposalChange}
          />

          <Input
            label="Proposed Budget"
            type="number"
            name="proposedBudget"
            value={proposalData.proposedBudget}
            onChange={handleProposalChange}
          />

          <Button>
            Submit Proposal
          </Button>
        </form>
      </Card>
    )}

    {/* Main Project Card */}
    <Card className="p-8 rounded-2xl shadow-sm">

      {/* Budget & Status */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-blue-50 rounded-xl p-5">
          <h3 className="text-sm text-gray-500">
            Budget
          </h3>

          <p className="text-3xl font-bold text-blue-700">
            ₹{selectedProject.budget}
          </p>
        </div>

        <div className="bg-green-50 rounded-xl p-5">
          <h3 className="text-sm text-gray-500">
            Status
          </h3>

          <p className="text-xl font-semibold text-green-700">
            {selectedProject.status
              .replace("_", " ")
              .toUpperCase()}
          </p>
        </div>

      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="font-semibold mb-3">
          Skills Required
        </h2>

        <div className="flex flex-wrap gap-2">
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
                  font-medium
                "
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="font-semibold mb-3">
          Description
        </h2>

        <div className="bg-gray-50 rounded-xl p-5">
          <p className="text-gray-700 leading-relaxed">
            {selectedProject.description}
          </p>
        </div>
      </div>

      {/* Client Information */}
      <div className="bg-gray-50 rounded-xl p-5">

        <h2 className="font-semibold mb-3">
          Posted By
        </h2>

        <p className="font-medium">
          {selectedProject.client?.name}
        </p>

        <p className="text-gray-600">
          {selectedProject.client?.email}
        </p>

        {selectedProject?.assignedFreelancer && (
          <div className="border-t mt-5 pt-5">

            <h2 className="font-semibold mb-3">
              Assigned Freelancer
            </h2>

            <p className="font-medium">
              {
                selectedProject
                  .assignedFreelancer
                  .name
              }
            </p>

            <p className="text-gray-600">
              {
                selectedProject
                  .assignedFreelancer
                  .email
              }
            </p>

          </div>
        )}

      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">

        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {user?._id ===
          selectedProject?.client?._id && (
          <>
            <Link
              to={`/projects/edit/${selectedProject._id}`}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-2
                rounded-xl
              "
            >
              Edit Project
            </Link>

            <Link
              to={`/projects/${selectedProject._id}/proposals`}
              className="
                bg-purple-600
                hover:bg-purple-700
                text-white
                px-4
                py-2
                rounded-xl
              "
            >
              View Proposals
            </Link>

            {selectedProject.status ===
              "in_progress" && (
              <button
                onClick={handleComplete}
                className="
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >
                Mark Completed
              </button>
            )}

            <button
              onClick={handleDelete}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-4
                py-2
                rounded-xl
              "
            >
              Delete
            </button>
          </>
        )}

      </div>

    </Card>

    {/* Client Proposal Section */}
    {user?._id ===
      selectedProject?.client?._id && (
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Received Proposals
        </h2>

        {proposals.length === 0 ? (
          <Card>
            No proposals received yet.
          </Card>
        ) : (
          <div className="space-y-4">

            {proposals.map(
              (proposal) => (
                <Card
                  key={proposal._id}
                  className="
                    p-6
                    rounded-2xl
                    shadow-sm
                    hover:shadow-md
                    transition
                  "
                >
                  <h3 className="text-lg font-bold">
                    {
                      proposal.freelancer
                        ?.name
                    }
                  </h3>

                  <p className="text-gray-500">
                    {
                      proposal.freelancer
                        ?.email
                    }
                  </p>

                  <p className="mt-3">
                    <strong>
                      Proposed Budget:
                    </strong>{" "}
                    ₹
                    {
                      proposal.proposedBudget
                    }
                  </p>

                  <p className="mt-3 text-gray-700">
                    {
                      proposal.coverLetter
                    }
                  </p>

                  <span
                    className="
                      inline-block
                      mt-4
                      px-3
                      py-1
                      rounded-full
                      bg-yellow-100
                      text-yellow-700
                      text-sm
                    "
                  >
                    {proposal.status}
                  </span>

                  {proposal.status ===
                    "pending" && (
                    <div className="flex gap-3 mt-4">

                      <Button
                        onClick={() =>
                          handleStatusUpdate(
                            proposal._id,
                            "accepted"
                          )
                        }
                      >
                        Accept
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          handleStatusUpdate(
                            proposal._id,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </Button>

                    </div>
                  )}
                </Card>
              )
            )}

          </div>
        )}

      </div>
    )}

  </PageContainer>
);
};

export default ProjectDetails;