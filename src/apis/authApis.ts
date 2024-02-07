import AXIOS from "../config/axiosConfig";
import notification from "../config/notification";

export const handleSignup = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  try {
    const res: any = await AXIOS.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });
    notification.success("Successfully signed up");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error(error.message);
    }
  }
};

export const handleSignin = async (email: string, password: string) => {
  try {
    const res: any = await AXIOS.post("/auth/signin", {
      email,
      password,
    });
    notification.success("Successfully logged in");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      notification.error(error.message);
      console.log(`Error: ${error.message}`);
    }
  }
};

export const getUser = async () => {
  try {
    const res: any = await AXIOS.get("/user/get-user");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error(error.message);
    }
  }
};

export const handleLogout = async () => {
  try {
    await AXIOS.get("/auth/signout");
    console.log("Error");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error(error.message);
    }
  }
};
