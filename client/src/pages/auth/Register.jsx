import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../features/auth/authSlice";

import { useAppDispatch } from "../../hooks/reduxHooks";
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
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

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
            className="w-full p-3 rounded-lg bg-slate-700 outline-none"
          />

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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-700 outline-none"
          >
            <option value="client">
              Client
            </option>

            <option value="freelancer">
              Freelancer
            </option>
          </select>

          <button
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-400 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;