import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/reduxHooks";

import AuthLoader from "../components/common/AuthLoader";

const PublicRoute = ({ children }) => {
  const {
    isAuthenticated,
    isAuthInitialized,
  } = useAppSelector((state) => state.auth);

  if (!isAuthInitialized) {
    return <AuthLoader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;