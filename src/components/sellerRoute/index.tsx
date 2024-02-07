import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const SellerRoute = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  if (user.isAdmin === "Saler") {
    return <Outlet />;
  }
  return <Navigate to="/unauthorised" />;
};

export default SellerRoute;
