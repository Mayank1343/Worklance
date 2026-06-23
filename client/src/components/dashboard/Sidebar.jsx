import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../features/auth/authSlice";

import {
  freelancerLinks,
  clientLinks,
  adminLinks,
} from "../../constants/navigation";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  let links;

  switch (user?.role) {
    case "freelancer":
      links = freelancerLinks;
      break;

    case "client":
      links = clientLinks;
      break;

    case "admin":
      links = adminLinks;
      break;

    default:
      links = [];
  }

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-full shadow-xl">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-blue-400">
          Worklance
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Freelance Marketplace
        </p>
      </div>

      {/* User Info */}
      <div className="px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="
              h-11
              w-11
              rounded-full
              bg-blue-600
              flex
              items-center
              justify-center
              text-white
              font-bold
            "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold">
              {user?.name}
            </h3>

            <p className="text-sm text-slate-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
              flex
              items-center
              px-4
              py-3
              rounded-xl
              transition-all
              duration-200
              font-medium
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }
            `
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="
            w-full
            bg-red-600
            hover:bg-red-700
            text-white
            py-3
            rounded-xl
            font-medium
            transition-all
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;