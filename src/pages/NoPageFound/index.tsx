import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NOT_FOUND_IMAGE from "../../assets/images/404-error-dribbble-800x600.gif";
import "./style.css";

const NoPageFound = () => {
  return (
    <Box className="no-page-found-container">
      <img className="no-page-found-image" src={NOT_FOUND_IMAGE} />
      <Link to="/">
        <Button variant="contained" className="back-to-home-button">
          <KeyboardBackspaceIcon />
          Back to Home
        </Button>
      </Link>
    </Box>
  );
};

export default NoPageFound;
