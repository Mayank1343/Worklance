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

import ProjectDetails from "../pages/projects/ProjectDetails";

import EditProject
from "../pages/projects/EditProject";

import ProjectProposals
from "../pages/proposals/ProjectProposals";

import MyProposals
from "../pages/proposals/MyProposals";

import ClientProposals
from "../pages/proposals/ClientProposals";


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
            <DashboardLayout>
              <Projects />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/create"
        element={
          <ProtectedRoute>
            <DashboardLayout>
            <CreateProject />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

        <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectDetails />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/edit/:id"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <EditProject />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:projectId/proposals"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <ProjectProposals />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-proposals"
        element={
          <ProtectedRoute roles={["freelancer"]}>
            <DashboardLayout>
              <MyProposals />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/proposals"
        element={
          <ProtectedRoute roles={["client"]}>
            <DashboardLayout>
              <ClientProposals />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;