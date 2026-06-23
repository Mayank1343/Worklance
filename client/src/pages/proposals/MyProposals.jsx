import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getMyProposals,
} from "../../features/proposal/proposalSlice";

const MyProposals = () => {
  const dispatch =
    useAppDispatch();

  const {
    proposals,
    isLoading,
    error,
  } = useAppSelector(
    (state) => state.proposal
  );

  useEffect(() => {
    dispatch(
      getMyProposals()
    );
  }, [dispatch]);

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

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        My Proposals
      </h1>

      {proposals.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">
          No proposals submitted yet.
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
                <h2 className="text-lg font-semibold">
                  {
                    proposal.project
                      ?.title
                  }
                </h2>

                <p className="mt-2">
                  Your Budget:
                  {" "}
                  ₹
                  {
                    proposal.proposedBudget
                  }
                </p>

                <p className="mt-2">
                  Project Budget:
                  {" "}
                  ₹
                  {
                    proposal.project
                      ?.budget
                  }
                </p>

                <p className="mt-3">
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

                <p className="mt-3 text-gray-600">
                  {
                    proposal.coverLetter
                  }
                </p>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
};

export default MyProposals;