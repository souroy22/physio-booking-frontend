import { Box } from "@mui/material";
import Navbar from "../navbar/Navbar";
import "./style.css";
import { ReactNode } from "react";

type PropTypes = {
  children?: ReactNode;
};

const Base = ({ children }: PropTypes) => {
  return (
    <Box className="base-section">
      <Navbar />
      <Box className="content-section">{children}</Box>
    </Box>
  );
};

export default Base;
