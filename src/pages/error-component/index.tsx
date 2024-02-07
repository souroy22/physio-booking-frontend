import { Box, Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import "./style.css";

const ErrorComponent = () => {
  return (
    <Box className="error-page-container">
      <img
        className="error-image"
        src="https://i.pinimg.com/originals/76/28/9a/76289acbe6c5a83ccf648702b7e8d3b9.gif"
      />
      <Button variant="outlined" onClick={() => window.location.reload()}>
        <ReplayIcon />
        Try again
      </Button>
    </Box>
  );
};

export default ErrorComponent;
