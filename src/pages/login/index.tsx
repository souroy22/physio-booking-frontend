import { Box, Button } from "@mui/material";
import "./style.css";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/auth/authReducer";
import { useNavigate } from "react-router-dom";
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
  const [data, setData] = useState<DataType>({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
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
      <Button
        variant="contained"
        onClick={async () => {
          const {
            token,
            user: { name, email, role, avatar, id },
          } = await handleSignin(data.email, data.password);
          console.log("Role", role);
          console.log("Name", name);
          dispatch(
            setUserData({ token, name, email, isAdmin: role, avatar, id })
          );
          navigate("/");
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
