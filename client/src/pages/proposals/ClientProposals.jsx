import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getClientProposals,
} from "../../features/proposal/proposalSlice";

import PageContainer from "../../components/ui/PageContainer";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import Loader from "../../components/ui/Loader";

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
    return <Loader />;
  }

  return (
    <PageContainer>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Received Proposals
        </h1>

        <p className="text-gray-500 mt-2">
          Review all proposals
          submitted to your projects.
        </p>
      </div>

      {(clientProposals || []).length === 0 ? (

        <Card>
          <EmptyState
            title="No Proposals Yet"
            description="Freelancer proposals will appear here."
          />
        </Card>

      ) : (

        <div className="space-y-5">

          {(clientProposals || []).map(
            (proposal) => (
              <Card
                key={proposal._id}
                className="
                  rounded-2xl
                  border
                  shadow-sm
                  hover:shadow-md
                  transition
                  duration-300
                "
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2
                      className="
                        text-xl
                        font-bold
                        text-gray-900
                      "
                    >
                      {
                        proposal.project
                          ?.title
                      }
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Submitted by
                      {" "}
                      {
                        proposal.freelancer
                          ?.name
                      }
                    </p>

                  </div>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      ${
                        proposal.status ===
                        "accepted"
                          ? "bg-green-100 text-green-700"
                          : proposal.status ===
                            "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {proposal.status}
                  </span>

                </div>

                <div className="mt-5">

                  <p className="text-gray-500 text-sm">
                    Freelancer Email
                  </p>

                  <p className="font-medium">
                    {
                      proposal.freelancer
                        ?.email
                    }
                  </p>

                </div>

                <div className="mt-5">

                  <p className="text-gray-500 text-sm">
                    Proposed Budget
                  </p>

                  <p
                    className="
                      text-2xl
                      font-bold
                      text-blue-600
                    "
                  >
                    ₹
                    {
                      proposal.proposedBudget
                    }
                  </p>

                </div>

              </Card>
            )
          )}

        </div>

      )}

    </PageContainer>
  );
};

export default ClientProposals;