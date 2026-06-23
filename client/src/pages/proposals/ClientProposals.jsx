import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getClientProposals,
} from "../../features/proposal/proposalSlice";

const ClientProposals = () => {
  const dispatch =
    useAppDispatch();

  const {
    clientProposals,
    isLoading,
  } = useAppSelector(
    (state) => state.proposal
  );

  useEffect(() => {
    dispatch(
      getClientProposals()
    );
  }, [dispatch]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Received Proposals
      </h1>

      <div className="space-y-4">

        {(clientProposals || []).map(
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
              <h2 className="font-bold">
                {
                  proposal.project
                    ?.title
                }
              </h2>

              <p>
                Freelancer:
                {" "}
                {
                  proposal.freelancer
                    ?.name
                }
              </p>

              <p>
                Email:
                {" "}
                {
                  proposal.freelancer
                    ?.email
                }
              </p>

              <p>
                Budget:
                ₹
                {
                  proposal.proposedBudget
                }
              </p>

              <p>
                Status:
                {" "}
                {
                  proposal.status
                }
              </p>

            </div>
          )
        )}

      </div>
    </div>
  );
};

export default ClientProposals;