import { useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getProjectProposals,
  updateProposalStatus,
} from "../../features/proposal/proposalSlice";

const ProjectProposals = () => {
  const { projectId } =
    useParams();

  const dispatch =
    useAppDispatch();

  const { proposals } =
    useAppSelector(
      (state) => state.proposal
    );

  useEffect(() => {
    dispatch(
      getProjectProposals(
        projectId
      )
    );
  }, [dispatch, projectId]);

  const handleStatusUpdate =
    (
      proposalId,
      status
    ) => {
      dispatch(
        updateProposalStatus({
          proposalId,
          status,
        })
      );
    };

  return (
    <div className="space-y-4">

      <h1 className="text-3xl font-bold">
        Project Proposals
      </h1>

      {proposals.map(
        (proposal) => (
          <div
            key={proposal._id}
            className="border p-4 rounded"
          >
            <h3 className="font-semibold">
              {
                proposal.freelancer
                  ?.name
              }
            </h3>

            <p>
              {
                proposal.coverLetter
              }
            </p>

            <p>
              Budget: ₹
              {
                proposal.proposedBudget
              }
            </p>

            <p>
              Status:
              {" "}
              {proposal.status}
            </p>

            {proposal.status ===
              "pending" && (
              <div className="flex gap-2 mt-3">

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      proposal._id,
                      "accepted"
                    )
                  }
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate(
                      proposal._id,
                      "rejected"
                    )
                  }
                >
                  Reject
                </button>

              </div>
            )}
          </div>
        )
      )}

    </div>
  );
};

export default ProjectProposals;