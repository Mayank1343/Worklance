import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../features/auth/authSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(
      registerUser(formData)
    );

    if (
      registerUser.fulfilled.match(resultAction)
    ) {
      alert(
        "Registration successful! Please login."
      );

      navigate("/login");
    }
  };

  const { error, isLoading } =
  useAppSelector(
    (state) => state.auth
  );

return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-900
        via-blue-900
        to-indigo-900
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white/10
          backdrop-blur-lg
          border
          border-white/20
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white">
            Worklance
          </h1>

          <p className="text-gray-300 mt-2">
            Freelance Marketplace Platform
          </p>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-300
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-300
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              placeholder:text-gray-300
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="
              w-full
              p-3
              rounded-xl
              bg-white/10
              border
              border-white/20
              text-white
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option
              value="client"
              className="text-black"
            >
              Client
            </option>

            <option
              value="freelancer"
              className="text-black"
            >
              Freelancer
            </option>
          </select>

          <button
            disabled={isLoading}
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              disabled:bg-green-800
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            {isLoading
              ? "Creating Account..."
              : "Register"}
          </button>
          {error && (
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          )}

          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;