import AXIOS from "../config/axiosConfig";
import notification from "../config/notification";

export const getUserByEmailId = async (email: string) => {
  try {
    const res: any = await AXIOS.post("/user/get-user-by-mailid", { email });
    if (res.data.msg) {
      notification.error("No user found!");
      return false;
    }
    notification.success("Verified user successfully!");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error("Error while getting user data");
    }
  }
};
