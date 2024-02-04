import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";
import "./styles.css";

type PropTypes = {
  loader: boolean;
};

const Loader = ({ loader }: PropTypes) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loader}
    >
      <img
        alt="loading..."
        className="loader-image"
        src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!bw700"
      />
    </Backdrop>
  );
};

export default Loader;
