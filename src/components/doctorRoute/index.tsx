import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const DoctorRoute = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  if (user.isAdmin === "Doctor") {
    return <Outlet />;
  }
  return <Navigate to="/unauthorised" />;
};

export default DoctorRoute;
