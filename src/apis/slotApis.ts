import AXIOS from "../config/axiosConfig";
import notification from "../config/notification";

type FnType = (id?: string, timing?: any) => any;

export const getAvailableSlots: FnType = async (id, timing) => {
  try {
    const params: { doctorId?: string; timing?: any } = {};
    if (id?.trim()) {
      params["doctorId"] = id;
    }
    if (timing?.trim()) {
      params["timing"] = timing;
    }
    const res: any = await AXIOS.get("/slot/available-slots", { params });
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
    const res: any = await AXIOS.get("/slot/unscheduled-slots");
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
    await AXIOS.put("/doctor/schedule-slots", { id, data });
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
  remarks: string,
  doctorId: string
) => {
  try {
    await AXIOS.put("/slot/book-slot", {
      slotId,
      bookedBy,
      remarks,
      doctorId,
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

export const getMySlots = async () => {
  try {
    const res: any = await AXIOS.get(`slot/get-my-slots`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
      notification.error("Error while booking slot");
    }
  }
};
