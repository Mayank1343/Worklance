import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import Profile from "../pages/profile/Profile";

import Projects
from "../pages/projects/Projects";

import CreateProject
from "../pages/projects/CreateProject";


const AppRoutes = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
       path="/profile"
       element={
        <ProtectedRoute>
         <DashboardLayout>
          <Profile />
        </DashboardLayout>
        </ProtectedRoute>
      }
     />

     <Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  }
/>

<Route
  path="/projects/create"
  element={
    <ProtectedRoute>
      <CreateProject />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
};

export default AppRoutes;