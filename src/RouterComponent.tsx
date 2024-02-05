import AuthWrapper from "./components/auth-wrapper";
import NonAuthRoute from "./components/non-auth-route";
import PrivateRoute from "./components/privateRoute";
import DoctorPage from "./pages/doctor";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { Route, Routes } from "react-router-dom";
import BookingPage from "./pages/booking";
import ChooseSlots from "./pages/choose-slots";
import Appointments from "./pages/appointments";
import NoPageFound from "./pages/NoPageFound";
import Profile from "./pages/profile";

const RouterComponent = () => {
  return (
    <Routes>
      <Route element={<NonAuthRoute />}>
        <Route element={<AuthWrapper />}>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/book-appointment">
          <Route index element={<BookingPage />} />
        </Route>
        <Route path="/choose-slots" element={<ChooseSlots />} />
      </Route>
      <Route path="/profile" element={<Profile />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
};

export default RouterComponent;
