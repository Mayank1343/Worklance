import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-2xl font-bold text-blue-600">
        Worklance
      </h1>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500 capitalize">
            {user?.role}
          </p>
        </div>

        <div
            className="
              w-10
              h-10
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
          >
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default Navbar;