import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../features/auth/authSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { isLoading, error } =
    useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      loginUser(formData)
    );

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 outline-none"
          />

          {error && (
            <p className="text-red-400">
              {error}
            </p>
          )}

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;