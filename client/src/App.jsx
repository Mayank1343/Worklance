import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "./features/auth/authSlice";
import AppRoutes from "./AppRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;