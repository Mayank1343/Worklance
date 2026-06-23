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
  const { projectId } = useParams();

  const dispatch = useAppDispatch();

  const {
    proposals,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.proposal
  );

  useEffect(() => {
    dispatch(
      getProjectProposals(projectId)
    );
  }, [dispatch, projectId]);

  const handleStatusUpdate = (
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

  if (isLoading) {
    return (
      <div className="p-6">
        Loading proposals...
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

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Project Proposals
      </h1>

      {proposals.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          No proposals received yet.
        </div>
      ) : (
        <div className="space-y-4">

          {proposals.map(
            (proposal) => (
              <div
                key={proposal._id}
                className="
                  bg-white
                  border
                  rounded-lg
                  p-5
                  shadow-sm
                "
              >
                <h3 className="text-lg font-semibold">
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

                <p className="mt-4">
                  {
                    proposal.coverLetter
                  }
                </p>

                <p className="mt-3 font-semibold">
                  Proposed Budget: ₹
                  {
                    proposal.proposedBudget
                  }
                </p>

                <p className="mt-2">
                  Status:
                  {" "}
                  <span
                    className={
                      proposal.status ===
                      "accepted"
                        ? "text-green-600 font-semibold"
                        : proposal.status ===
                          "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {proposal.status}
                  </span>
                </p>

                {proposal.status ===
                  "pending" && (
                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() =>
                        handleStatusUpdate(
                          proposal._id,
                          "accepted"
                        )
                      }
                      className="
                        bg-green-600
                        text-white
                        px-4
                        py-2
                        rounded
                      "
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
                      className="
                        bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded
                      "
                    >
                      Reject
                    </button>

                  </div>
                )}
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default ProjectProposals;