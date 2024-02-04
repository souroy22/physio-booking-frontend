import { Box } from "@mui/material";
import "./style.css";

type Proptypes = {
  imagePath: string;
  title: string;
  description: string;
};

const ServiceSection = ({ imagePath, title, description }: Proptypes) => {
  return (
    <Box className="service-card">
      <Box className="">
        <img className="service-image" alt="service" src={imagePath} />
      </Box>
      <Box className="service-card-title">{title}</Box>
      <Box className="service-card-description">{description}</Box>
    </Box>
  );
};

export default ServiceSection;
