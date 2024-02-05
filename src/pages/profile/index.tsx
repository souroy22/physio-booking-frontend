import { Avatar, Box, Button, TextField } from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import "./style.css";

const Profile = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);

  return (
    <Box className="profile-container">
      <Box className="profile-card">
        <Box className="profile-heading">Profile</Box>
        <Box className="profile-card-content">
          <Box className="data-section">
            <Box className="data-container">
              <Box className="data-heading">Full Name</Box>
              <TextField
                className="data-value"
                value={user.name}
                variant="standard"
                placeholder="Full Name"
                disabled
              />
            </Box>
            <Box className="data-container">
              <Box className="data-heading">Email Address</Box>
              <TextField
                className="data-value"
                value={user.email}
                variant="standard"
                placeholder="Email id"
                disabled
              />
            </Box>
            <Box className="data-container">
              <Box className="data-heading">Address</Box>
              <TextField
                className="data-value"
                value={""}
                variant="standard"
                placeholder="Address"
                disabled
              />
            </Box>
            <Box className="data-container">
              <Box className="data-heading">Phone Number</Box>
              <TextField
                className="data-value"
                value={""}
                variant="standard"
                placeholder="Phone Number"
                disabled
              />
            </Box>
          </Box>
          <Box className="right-section">
            <Box className="right-content">
              <CameraAltSharpIcon className="edit-profile-pic" />
              <Avatar
                className="profile-pic"
                alt="Profile Pic"
                src={user.avatar || ""}
              >
                {user.name.split("")[0]}
              </Avatar>
            </Box>
          </Box>
        </Box>
        <Button variant="contained" className="gradient-button">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
