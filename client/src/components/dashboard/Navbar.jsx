import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">
        Worklance
      </h1>

      <div className="flex items-center gap-3">
        <span className="font-medium">
          {user?.name}
        </span>

        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          {user?.name?.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default Navbar;