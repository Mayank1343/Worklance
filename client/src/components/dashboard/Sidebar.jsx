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
  <aside className="w-64 bg-white border-r flex flex-col">
    <nav className="flex flex-col p-4 gap-2 flex-1">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>

    <div className="p-4 border-t">
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  </aside>
);
};

export default Sidebar;