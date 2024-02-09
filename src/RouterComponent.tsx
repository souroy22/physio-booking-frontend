import { Box, CircularProgress } from "@mui/material";
import React from "react";
const LazyAuthWrapper = React.lazy(() => import("./components/auth-wrapper"));
const LazyNonAuthRoute = React.lazy(
  () => import("./components/non-auth-route")
);
const LazyHomePage = React.lazy(() => import("./pages/home"));
const LazyPrivateRoute = React.lazy(() => import("./components/privateRoute"));
const LazyLoginPage = React.lazy(() => import("./pages/login"));
const LazySignupPage = React.lazy(() => import("./pages/signup"));
const LazyBookingPage = React.lazy(() => import("./pages/booking"));
const LazyChooseSlots = React.lazy(() => import("./pages/choose-slots"));
const LazyAppointments = React.lazy(() => import("./pages/appointments"));
const LazyNoPageFound = React.lazy(() => import("./pages/NoPageFound"));
const LazyProfile = React.lazy(() => import("./pages/profile"));
const LazyMySlots = React.lazy(() => import("./pages/my-slots"));
const LazyUnAuthorisedPage = React.lazy(
  () => import("./pages/unAuthorised_page")
);
const LazySellerRoute = React.lazy(() => import("./components/sellerRoute"));
const LazyDoctorRoute = React.lazy(() => import("./components/doctorRoute"));
const LazyAvailableSlots = React.lazy(() => import("./pages/available-slots"));
import { Route, Routes } from "react-router-dom";

const RouterComponent = () => {
  return (
    <React.Suspense
      fallback={
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
            // filter: "blur(8px)",
          }}
        >
          <CircularProgress sx={{ zIndex: 10000 }} />
        </Box>
      }
    >
      <Routes>
        <Route path="/" element={<LazyHomePage />} />
        <Route element={<LazyNonAuthRoute />}>
          <Route element={<LazyAuthWrapper />}>
            <Route path="/signin" element={<LazyLoginPage />} />
            <Route path="/signup" element={<LazySignupPage />} />
          </Route>
        </Route>
        <Route element={<LazyPrivateRoute />}>
          <Route element={<LazySellerRoute />}>
            <Route path="/book-appointment">
              <Route index element={<LazyBookingPage />} />
            </Route>
          </Route>
          <Route element={<LazyDoctorRoute />}>
            <Route path="/choose-slots" element={<LazyChooseSlots />} />
            <Route path="/my-slots" element={<LazyMySlots />} />
          </Route>
          <Route path="/profile" element={<LazyProfile />} />
          <Route path="/appointments" element={<LazyAppointments />} />
          <Route path="/available-slots" element={<LazyAvailableSlots />} />
        </Route>
        <Route path="/unauthorised" element={<LazyUnAuthorisedPage />} />
        <Route path="*" element={<LazyNoPageFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default RouterComponent;
