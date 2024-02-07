import { Box, Button } from "@mui/material";
import "./style.css";
import { Link } from "react-router-dom";

const UnAuthorisedPage = () => {
  return (
    <Box className="unauthorised-section">
      <img
        className="unauthorised-image"
        src="https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg?resize=400x0"
      />
      <Link to="/">
        <Button variant="contained">Go back Home</Button>
      </Link>
    </Box>
  );
};

export default UnAuthorisedPage;
