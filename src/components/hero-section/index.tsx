import { Box } from "@mui/material";
import HERO_IMAGE from "../../assets/images/hero_image.webp";
import "./style.css";

const HeroSection = () => {
  return (
    <Box>
      <img className="hero-section-image" src={HERO_IMAGE} />
    </Box>
  );
};

export default HeroSection;
