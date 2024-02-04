import { Box, Typography } from "@mui/material";
import "./style.css";
import HeroSection from "../../components/hero-section";
import ServiceSection from "../../components/service-section";
import { services } from "../../data/servicesData";
import Testimonials from "../../components/testimonials";

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <Box className="services-container">
        <Box className="services-title">What to Expect from us?</Box>
        <Typography className="services-section">
          At Physio, expect a transformative healthcare experience focused on
          your unique needs and well-being. Our skilled physiotherapists conduct
          thorough assessments to craft individualized treatment plans,
          utilizing evidence-based techniques for effective results.
        </Typography>
        <Box className="services">
          {services.map((service) => (
            <ServiceSection
              imagePath={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </Box>
        <Box sx={{ paddingBottom: "30px", marginTop: "50px" }}>
          <Testimonials />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
