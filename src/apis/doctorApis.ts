import AXIOS from "../config/axiosConfig";
import notification from "../config/notification";

export const getDoctors = async () => {
  try {
    const res: any = await AXIOS.get("/doctor/all");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      notification.error("Error while getting doctors");
      console.log(`Error: ${error.message}`);
    }
  }
};
