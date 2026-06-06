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

import { useState } from "react";

import {
  createProposal,
} from "../../features/proposal/proposalSlice";

import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";

import {
  getProjectProposals,
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

      <h1 className="text-3xl font-bold mb-6">
        {selectedProject.title}
      </h1>

      {
        user?.role ===
          "freelancer" && (

          <Card className="mt-6">

            <h2 className="text-xl font-semibold mb-4">
              Apply for this Project
            </h2>

            <form
              onSubmit={
                handleProposalSubmit
              }
              className="space-y-4"
            >

              <TextArea
                label="Cover Letter"
                name="coverLetter"
                value={
                  proposalData.coverLetter
                }
                onChange={
                  handleProposalChange
                }
              />

              <Input
                label="Proposed Budget"
                type="number"
                name="proposedBudget"
                value={
                  proposalData.proposedBudget
                }
                onChange={
                  handleProposalChange
                }
              />

              <Button>
                Submit Proposal
              </Button>

            </form>

          </Card>
        )
      }

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

      {
        user?._id ===
          selectedProject?.client?._id && (
          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
              Received Proposals
            </h2>

            {
              proposals.length === 0 ? (
                <p>
                  No proposals yet
                </p>
              ) : (
                <div className="space-y-4">

                  {proposals.map(
                    (proposal) => (
                      <div
                        key={proposal._id}
                        className="
                          border
                          rounded-lg
                          p-4
                          bg-white
                        "
                      >
                        <h3 className="font-bold">
                          {
                            proposal
                              .freelancer
                              ?.name
                          }
                        </h3>

                        <p className="text-sm text-gray-500">
                          {
                            proposal
                              .freelancer
                              ?.email
                          }
                        </p>

                        <p className="mt-2">
                          <strong>
                            Budget:
                          </strong>{" "}
                          ₹
                          {
                            proposal
                              .proposedBudget
                          }
                        </p>

                        <p className="mt-2">
                          {
                            proposal
                              .coverLetter
                          }
                        </p>

                        <span
                          className="
                            inline-block
                            mt-3
                            px-3
                            py-1
                            bg-yellow-100
                            rounded-full
                            text-sm
                          "
                        >
                          {
                            proposal.status
                          }
                        </span>
                      </div>
                    )
                  )}

                </div>
              )
            }

          </div>
        )
      }
      </div>

    </PageContainer>
  );
};

export default ProjectDetails;