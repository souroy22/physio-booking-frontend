import Backdrop from "@mui/material/Backdrop";
import LOADING_IMAGE from "../../assets/images/pngtree-cartoon-snail-loading-gif-dynamic-diagram-png-image_6992584.png";
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
      <img alt="loading..." className="loader-image" src={LOADING_IMAGE} />
    </Backdrop>
  );
};

export default Loader;
