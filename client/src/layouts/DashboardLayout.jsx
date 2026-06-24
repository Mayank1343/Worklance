import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto bg-slate-100">
          {children}
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;