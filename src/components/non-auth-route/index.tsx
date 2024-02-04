import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const NonAuthRoute = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  const location = useLocation();

  if (isLoggedIn) {
    return (
      <Navigate
        to={location.state?.prevUrl || "/"}
        state={{ prevUrl: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default NonAuthRoute;
