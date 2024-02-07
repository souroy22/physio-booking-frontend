import { Box, Button, CircularProgress } from "@mui/material";
import "./style.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import TextInput from "../../components/input";
import { TbPasswordUser } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { setUserData } from "../../store/auth/authReducer";
import { handleSignup } from "../../apis/authApis";
import Dropdown, { OptionType } from "../../components/dropdown";

// type ROLE_TYPE = "User" | "Doctor" | "Saler";

type DataType = {
  name: string;
  email: string;
  password: string;
  role: { name: string; value: string };
};

const SignupPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>({
    name: "",
    email: "",
    password: "",
    role: { name: "User", value: "User" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (name: string, value: OptionType | string) => {
    setData({ ...data, [name]: value });
  };

  const chooseRole = (_: string, value: OptionType) => {
    setData({ ...data, role: value });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      const {
        token,
        user: { name, email, role, avatar, id },
      } = await handleSignup(
        data.name,
        data.email,
        data.password,
        data.role.value
      );
      dispatch(setUserData({ token, name, email, isAdmin: role, avatar, id }));
      navigate("/");
    } catch (error) {
      //
    }
    setLoading(false);
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
        handleChange={chooseRole}
        placeholder="Select Role"
        options={[
          { name: "Patient", value: "User" },
          { name: "Saler", value: "Saler" },
          { name: "Doctor", value: "Doctor" },
        ]}
      />
      <Button variant="contained" onClick={handleClick}>
        {loading ? (
          <CircularProgress
            sx={{
              height: "20px !important",
              width: "20px !important",
              color: "#FFF",
            }}
          />
        ) : (
          "Signup"
        )}
      </Button>
      <Box className="rediret-text">
        Already Signed up?{" "}
        <span className="highlight-link">
          <Link to="/signin">Please Login</Link>
        </span>
      </Box>
    </Box>
  );
};

export default SignupPage;
