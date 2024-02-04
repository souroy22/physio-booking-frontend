import AXIOS from "../config/axiosConfig";
import notification from "../config/notification";

type FnType = (id?: string, timing?: any) => any;

export const getAvailableSlots: FnType = async (id, timing) => {
  try {
    const params: { id?: string; timing?: any } = {};
    if (id) {
      params["id"] = id;
    }
    if (timing) {
      params["timing"] = timing;
    }
    const res: any = await AXIOS.get("/slot/available-slot", { params });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      notification.error("Error while getting doctors");
      console.log(`Error: ${error.message}`);
    }
  }
};

export const getUnscheduleSlots = async () => {
  try {
    const res: any = await AXIOS.get("/slot/unschedule-slots");
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      notification.error("Error while getting doctors");
      console.log(`Error: ${error.message}`);
    }
  }
};

export const scheduledSlots = async (id: any, data: any) => {
  try {
    await AXIOS.put("/doctor/get-all-slots", { id, data });
    notification.success("Successfully scheduled for this week");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error("Error while schedule slots");
    }
  }
};

export const bookSlot = async (
  slotId: string,
  bookedBy: string,
  remarks: string
) => {
  try {
    await AXIOS.put("/slot/book-slot", {
      slotId,
      bookedBy,
      remarks,
    });
    notification.success("Booked Sucessfull");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error("Error while booking slot");
    }
  }
};

export const getAppointments = async (id: string) => {
  console.log("Id", id);
  try {
    const res: any = await AXIOS.get(`slot/appointments/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error("Error while booking slot");
    }
  }
};
