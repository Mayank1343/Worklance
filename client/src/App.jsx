import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser, initializeAuth,} from "./features/auth/authSlice";
import AppRoutes from "./routes/AppRoutes";

import { useSelector } from "react-redux";

function App() {
      const auth = useSelector((state) => state.auth);
      console.log("AUTH STATE:", auth);

  const dispatch = useDispatch();

  const { accessToken } =
    useSelector(
      (state) => state.auth
    );

  useEffect(() => {
    if (accessToken) {
      dispatch(
        getCurrentUser()
      );
    } else {
      dispatch(
        initializeAuth()
      );
    }
  }, [
    dispatch,
    accessToken,
  ]);

    return <AppRoutes />;
  }

export default App;