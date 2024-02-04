import { toast } from "react-toastify";

const notification = {
  success: (msg: string) => {
    toast.success(msg);
  },
  error: (msg: string) => {
    toast.error(msg);
  },
};

export default notification;
