import { useEffect } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  getMyProposals,
} from "../../features/proposal/proposalSlice";

import EmptyState from "../../components/ui/EmptyState";
import Card from "../../components/ui/Card";
import Loader from "../../components/ui/Loader";
import PageContainer from "../../components/ui/PageContainer";

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
    return <Loader />;
  }

  if (error) {
    return (
      <PageContainer>
        <div className="text-red-500">
          {error}
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          My Proposals
        </h1>

        <p className="text-gray-500 mt-2">
          Track all proposals you've
          submitted to clients.
        </p>
      </div>

      {proposals.length === 0 ? (

        <Card>
          <EmptyState
            title="No Proposals Yet"
            description="Start applying to projects and your proposals will appear here."
          />
        </Card>

      ) : (

        <div className="space-y-5">

          {proposals.map(
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
                      Project Budget:
                      {" "}
                      ₹
                      {
                        proposal.project
                          ?.budget
                      }
                    </p>
                  </div>

                  <span
                    className={
                      `
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
                    `
                    }
                  >
                    {proposal.status}
                  </span>

                </div>

                <div className="mt-5">

                  <p className="font-medium">
                    Your Proposed Budget
                  </p>

                  <p
                    className="
                      text-2xl
                      font-bold
                      text-blue-600
                      mt-1
                    "
                  >
                    ₹
                    {
                      proposal.proposedBudget
                    }
                  </p>

                </div>

                <div
                  className="
                    mt-5
                    bg-gray-50
                    rounded-xl
                    p-4
                  "
                >
                  <p className="text-gray-700">
                    {
                      proposal.coverLetter
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

export default MyProposals;