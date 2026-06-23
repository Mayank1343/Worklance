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

  const { user } = useSelector(
    (state) => state.auth
  );

  const { projects } = useSelector(
    (state) => state.project
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

  const inProgressProjects =
    projects?.filter(
      (project) =>
        project.status ===
        "in_progress"
    ).length || 0;

  const completedProjects =
    projects?.filter(
      (project) =>
        project.status ===
        "completed"
    ).length || 0;

  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <div
        className="
          bg-white
          rounded-2xl
          p-8
          shadow-sm
          border
        "
      >
        <h1
          className="
            text-4xl
            font-bold
            text-gray-900
          "
        >
          Welcome back,
          {" "}
          {user?.name}
          👋
        </h1>

        <p
          className="
            mt-3
            text-gray-600
            text-lg
          "
        >
          Manage your freelance
          marketplace activity,
          projects and proposals.
        </p>

        <div
          className="
            mt-6
            inline-flex
            items-center
            px-4
            py-2
            bg-blue-50
            text-blue-700
            rounded-full
            text-sm
            font-medium
          "
        >
          Logged in as
          {" "}
          {user?.role}
        </div>
      </div>

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
        <StatCard
          title="Total Projects"
          value={totalProjects}
        />

        <StatCard
          title="Open Projects"
          value={openProjects}
        />

        <StatCard
          title="In Progress"
          value={inProgressProjects}
        />

        <StatCard
          title="Completed"
          value={completedProjects}
        />
      </div>

      {/* Quick Overview */}
      <div
        className="
          bg-white
          rounded-2xl
          p-6
          shadow-sm
          border
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            mb-4
          "
        >
          Overview
        </h2>

        <div
          className="
            grid
            md:grid-cols-3
            gap-4
          "
        >
          <div
            className="
              p-4
              rounded-xl
              bg-green-50
            "
          >
            <p className="text-sm text-gray-500">
              Active Projects
            </p>

            <h3
              className="
                text-2xl
                font-bold
                text-green-700
              "
            >
              {openProjects}
            </h3>
          </div>

          <div
            className="
              p-4
              rounded-xl
              bg-yellow-50
            "
          >
            <p className="text-sm text-gray-500">
              In Progress
            </p>

            <h3
              className="
                text-2xl
                font-bold
                text-yellow-700
              "
            >
              {inProgressProjects}
            </h3>
          </div>

          <div
            className="
              p-4
              rounded-xl
              bg-blue-50
            "
          >
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <h3
              className="
                text-2xl
                font-bold
                text-blue-700
              "
            >
              {completedProjects}
            </h3>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;