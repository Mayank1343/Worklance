import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getClientProposals,
  updateProposalStatus,
} from "../../features/proposal/proposalSlice";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageContainer from "../../components/ui/PageContainer";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

const ClientProposals = () => {
  const dispatch = useAppDispatch();

  const {
    clientProposals,
    isLoading,
  } = useAppSelector(
    (state) => state.proposal
  );

  useEffect(() => {
    dispatch(getClientProposals());
  }, [dispatch]);

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
    return <Loader />;
  }

  if (
    !isLoading &&
    clientProposals.length === 0
  ) {
    return (
      <EmptyState
        title="No Proposals Received"
        description="Freelancer proposals will appear here."
      />
    );
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-2">
        Received Proposals
      </h1>

      <p className="text-gray-500 mb-6">
        Review and manage freelancer proposals.
      </p>

      {!clientProposals?.length ? (
        <Card>
          <p className="text-center text-gray-500">
            No proposals received yet.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {clientProposals.map(
            (proposal) => (
              <Card
                key={proposal._id}
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h2 className="text-xl font-bold">
                      {
                        proposal.project
                          ?.title
                      }
                    </h2>

                    <p className="text-gray-600">
                      {
                        proposal
                          .freelancer
                          ?.name
                      }
                    </p>

                    <p className="text-sm text-gray-500">
                      {
                        proposal
                          .freelancer
                          ?.email
                      }
                    </p>
                  </div>

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
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

                <div className="mt-4">
                  <p className="font-semibold">
                    Proposed Budget
                  </p>

                  <p className="text-2xl font-bold text-blue-600">
                    ₹
                    {
                      proposal.proposedBudget
                    }
                  </p>
                </div>

                <div className="mt-4">
                  <p className="font-semibold mb-1">
                    Cover Letter
                  </p>

                  <p className="text-gray-700">
                    {
                      proposal.coverLetter
                    }
                  </p>
                </div>

                {proposal.status ===
                  "pending" && (
                  <div className="flex gap-3 mt-5">

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
    </PageContainer>
  );
};

export default ClientProposals;