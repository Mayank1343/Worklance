import { useSelector } from "react-redux";
import StatCard from "../../components/dashboard/StatCard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome Back, {user?.name}
      </h1>

      <p className="text-gray-500 mt-2">
        Role: {user?.role}
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <StatCard
          title="Projects"
          value="0"
        />

        <StatCard
          title="Proposals"
          value="0"
        />

        <StatCard
          title="Messages"
          value="0"
        />
      </div>
    </div>
  );
};

export default Dashboard;