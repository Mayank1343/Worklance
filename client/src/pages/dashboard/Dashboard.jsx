import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector(
    (state) => state.auth
  );

  return (
    <div>
      <h1 className="text-3xl font-bold">
        Welcome Back,
        {user?.name}
      </h1>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Total Projects</h2>
          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Proposals</h2>
          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2>Messages</h2>
          <p className="text-3xl font-bold">
            0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;