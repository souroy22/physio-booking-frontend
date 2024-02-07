import { useEffect, useState } from "react";
import { Avatar, Box, Button, TextField, Tooltip } from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import CameraAltSharpIcon from "@mui/icons-material/CameraAltSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import "./style.css";

type DATA_TYPE = {
  name: string;
  email: string;
  address: string;
  phone: string;
  //   avatar: File | null;
};

const Profile = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [data, setData] = useState<DATA_TYPE>({
    name: "",
    email: "",
    address: "",
    phone: "",
    // avatar: null,
  });
  const [fakeUpdate, setFakeUpdate] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.authReducer.user);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
    setFakeUpdate(!fakeUpdate);
  };

  const handleClick = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg,.jpeg,.png";
    input.onchange = (event: Event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        console.log(typeof files[0]);
      }
    };
    input.click();
  };

  const handleEdit = () => {};

  useEffect(() => {
    setData({
      ...data,
      name: user.name,
      email: user.email,
    });
  }, []);

  return (
    <Box className="profile-container">
      <Box className="profile-card">
        <Box className="edit-icon">
          {editMode ? (
            <CloseSharpIcon
              onClick={() => setEditMode(false)}
              sx={{ color: "red", fontWeight: "900 !important" }}
            />
          ) : (
            <Tooltip title="Edit" arrow>
              <EditSharpIcon onClick={() => setEditMode(true)} />
            </Tooltip>
          )}
        </Box>

        <Box className="profile-heading">Profile</Box>
        <Box className="profile-card-content">
          <Box className="data-section">
            <Box className="data-container">
              <Box className="data-heading">Full Name</Box>
              <TextField
                name="name"
                className="data-value"
                value={data.name}
                variant="standard"
                placeholder="Full Name"
                disabled={!editMode}
                autoComplete="off"
                onChange={onChange}
                fullWidth
              />
            </Box>
            <Box className="data-container">
              <Box className="data-heading">Email Address</Box>
              <TextField
                name="email"
                className="data-value"
                value={data.email}
                variant="standard"
                placeholder="Email id"
                disabled={!editMode}
                autoComplete="false"
                onChange={onChange}
                fullWidth
              />
            </Box>
            <Box className="data-container">
              <Box className="data-heading">Address</Box>
              <TextField
                fullWidth
                name="address"
                className="data-value"
                value={data.address}
                variant="standard"
                placeholder="Address"
                disabled={!editMode}
                autoComplete="false"
                onChange={onChange}
              />
            </Box>
            <Box className="data-container">
              <Box className="data-heading">Phone Number</Box>
              <TextField
                name="phone"
                className="data-value"
                value={data.phone}
                variant="standard"
                placeholder="Phone Number"
                disabled={!editMode}
                autoComplete="false"
                onChange={onChange}
                fullWidth
              />
            </Box>
          </Box>
          <Box className="right-section">
            <Tooltip title="Update Profile pic" arrow>
              <Box className="right-content" onClick={handleClick}>
                <CameraAltSharpIcon className="edit-profile-pic" />
                <Avatar
                  className="profile-pic"
                  alt="Profile Pic"
                  src={user.avatar || ""}
                >
                  {user.name.split("")[0]}
                </Avatar>
              </Box>
            </Tooltip>
          </Box>
        </Box>
        <Button
          variant="contained"
          className="gradient-button"
          onClick={handleEdit}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
