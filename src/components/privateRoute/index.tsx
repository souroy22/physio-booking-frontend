import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ prevUrl: location.pathname }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
