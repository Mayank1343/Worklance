import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-gray-200
        px-8
        flex
        items-center
        justify-between
        shadow-sm
      "
    >
      {/* Page Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-sm text-gray-500">
          Manage your freelance marketplace activity.
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold text-gray-800">
            {user?.name}
          </p>

          <p className="text-sm text-gray-500 capitalize">
            {user?.role}
          </p>
        </div>

        <div
          className="
            h-12
            w-12
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-lg
            shadow-md
          "
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Navbar;