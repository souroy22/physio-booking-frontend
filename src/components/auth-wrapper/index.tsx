import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./style.css";

const AuthWrapper = () => {
  return (
    <Box
      className="auth-wrapper"
      sx={
        screen.availWidth < 650
          ? {
              flexDirection: "column",
              justifyContent: "center",
            }
          : {}
      }
    >
      <Box
        className="auth-wrapper-left"
        sx={{ width: screen.availWidth < 500 ? "100%" : "50%" }}
      >
        <img
          className="auth-wrapper-left-image"
          src="https://assets-v2.lottiefiles.com/a/d491c948-1168-11ee-a395-fbe9133ed3d7/4h4t9GYFHZ.gif"
        />
      </Box>
      <Box
        className="auth-wrapper-right"
        sx={
          screen.availWidth < 650
            ? {
                width: "100%",
                margin: "0 auto",
                justifyContent: "center",
              }
            : {}
        }
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthWrapper;
