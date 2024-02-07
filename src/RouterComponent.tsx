import AuthWrapper from "./components/auth-wrapper";
import NonAuthRoute from "./components/non-auth-route";
import PrivateRoute from "./components/privateRoute";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { Route, Routes } from "react-router-dom";
import BookingPage from "./pages/booking";
import ChooseSlots from "./pages/choose-slots";
import Appointments from "./pages/appointments";
import NoPageFound from "./pages/NoPageFound";
import Profile from "./pages/profile";
import MySlots from "./pages/my-slots";
import UnAuthorisedPage from "./pages/unAuthorised_page";
import SellerRoute from "./components/sellerRoute";
import DoctorRoute from "./components/doctorRoute";

const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<NonAuthRoute />}>
        <Route element={<AuthWrapper />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route element={<SellerRoute />}>
          <Route path="/book-appointment">
            <Route index element={<BookingPage />} />
          </Route>
        </Route>
        <Route element={<DoctorRoute />}>
          <Route path="/choose-slots" element={<ChooseSlots />} />
          <Route path="/my-slots" element={<MySlots />} />
        </Route>
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>
      <Route path="/unauthorised" element={<UnAuthorisedPage />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
};

export default RouterComponent;
