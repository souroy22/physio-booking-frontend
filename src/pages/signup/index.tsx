import { Box, Button } from "@mui/material";
import "./style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import TextInput from "../../components/input";
import { TbPasswordUser } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { setUserData } from "../../store/auth/authReducer";
import { handleSignup } from "../../apis/authApis";
import Dropdown from "../../components/dropdown";

type DataType = {
  name: string;
  email: string;
  password: string;
  role: "User" | "Doctor" | "Saler";
};

const SignupPage = () => {
  const [data, setData] = useState<DataType>({
    name: "",
    email: "",
    password: "",
    role: "User",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (name: string, value: string) => {
    setData({ ...data, [name]: value });
  };

  return (
    <Box className="signup-form">
      <TextInput
        name="name"
        label="Enter full name"
        required
        value={data.name}
        handleChange={handleChange}
        id="signup-name"
        IconComponent={FaUserCircle}
      />
      <TextInput
        name="email"
        label="Enter Email id"
        required
        value={data.email}
        handleChange={handleChange}
        id="signup-email"
        IconComponent={MdAlternateEmail}
      />
      <TextInput
        name="password"
        label="Enter Password"
        required
        value={data.password}
        handleChange={handleChange}
        id="signup-email"
        type="password"
        IconComponent={TbPasswordUser}
      />
      <Dropdown
        selectedValue={data.role}
        name="role"
        handleChange={handleChange}
        placeholder="Select Role"
        options={[{ name: "User" }, { name: "Saler" }, { name: "Doctor" }]}
      />
      <Button
        variant="contained"
        onClick={async () => {
          const {
            token,
            user: { name, email, role, avatar, id },
          } = await handleSignup(
            data.name,
            data.email,
            data.password,
            data.role
          );
          dispatch(
            setUserData({ token, name, email, isAdmin: role, avatar, id })
          );
          navigate("/");
        }}
      >
        Signup
      </Button>
    </Box>
  );
};

export default SignupPage;
