import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

import { useSelector } from "react-redux";

function App() {
      const auth = useSelector((state) => state.auth);
      console.log("AUTH STATE:", auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;