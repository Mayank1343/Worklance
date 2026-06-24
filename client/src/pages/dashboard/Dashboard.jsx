import { useEffect } from "react";
import { useSelector } from "react-redux";

import StatCard from "../../components/dashboard/StatCard";

import {
  getProjects,
} from "../../features/project/projectSlice";

import {
  useAppDispatch,
} from "../../hooks/reduxHooks";

  const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { user } =
  useSelector(
    (state) => state.auth
  );

  const { projects } = useSelector(
    (state) => state.project
  );

  const { proposals } = useSelector(
  (state) => state.proposal
);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const totalProjects =
    projects?.length || 0;

  const openProjects =
    projects?.filter(
      (project) =>
        project.status === "open"
    ).length || 0;

  const completedProjects =
    projects?.filter(
      (project) =>
        project.status ===
        "completed"
    ).length || 0;

  const myProposals =
    proposals?.length || 0;

  const acceptedProposals =
    proposals?.filter(
      (proposal) =>
        proposal.status ===
        "accepted"
    ).length || 0;

  const activeProjects =
    projects?.filter(
      (project) =>
        project.status ===
        "in_progress"
    ).length || 0;

  return (
    <div className="space-y-8">

      {/* Analytics Cards */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {user?.role === "client" ? (
          <>
            <StatCard
              title="My Projects"
              value={totalProjects}
            />

            <StatCard
              title="Open"
              value={openProjects}
            />

            <StatCard
              title="Active"
              value={activeProjects}
            />

            <StatCard
              title="Completed"
              value={completedProjects}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Projects"
              value={totalProjects}
            />

            <StatCard
              title="My Proposals"
              value={myProposals}
            />

            <StatCard
              title="Accepted"
              value={acceptedProposals}
            />

            <StatCard
              title="Completed"
              value={completedProjects}
            />
          </>
        )}

      </div>

    </div>
    
  );
};

export default Dashboard;