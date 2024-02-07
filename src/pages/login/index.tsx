import { Box, Button, CircularProgress } from "@mui/material";
import "./style.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/auth/authReducer";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../components/input";
import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { handleSignin } from "../../apis/authApis";

type DataType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const {
        token,
        user: { name, email, role, avatar, id },
      } = await handleSignin(data.email, data.password);
      dispatch(setUserData({ token, name, email, isAdmin: role, avatar, id }));
      navigate("/");
    } catch (error) {
      //
    }
    setLoading(false);
  };

  return (
    <Box className="login-form">
      <TextInput
        name="email"
        label="Enter Email id"
        required
        value={data.email}
        handleChange={handleChange}
        id="login-email"
        IconComponent={MdAlternateEmail}
      />
      <TextInput
        name="password"
        label="Enter Password"
        required
        value={data.password}
        handleChange={handleChange}
        id="login-email"
        type="password"
        IconComponent={TbPasswordUser}
      />
      <Button variant="contained" onClick={handleClick}>
        {loading ? (
          <CircularProgress
            sx={{
              height: "22px !important",
              width: "22px !important",
              color: "#FFF",
            }}
          />
        ) : (
          "Login"
        )}
      </Button>
      <Box className="rediret-text">
        Not Signed up yet?{" "}
        <span className="highlight-link">
          <Link to="/signup">SIGN UP NOW</Link>
        </span>
      </Box>
    </Box>
  );
};

export default LoginPage;
