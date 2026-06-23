import { useSelector } from "react-redux";
import StatCard from "../../components/dashboard/StatCard";

import { useEffect } from "react";

import {
  getProjects,
} from "../../features/project/projectSlice";

import {
  useAppDispatch,
} from "../../hooks/reduxHooks";

  const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { projects } =
    useSelector(
      (state) => state.project
    );

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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getProjects()
    );
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome Back, {user?.name} 👋
        Manage your freelance marketplace activity.
      </h1>

      <p className="text-gray-500 mt-2">
        Role: {user?.role}
      </p>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        <StatCard
          title="Total Projects"
          value={totalProjects}
        />

        <StatCard
          title="Open"
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
    </div>
  );
};

export default Dashboard;