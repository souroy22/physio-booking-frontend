const startTime: number = 5; // 24 hours format
const endTime: number = 23; // 24 hours format
const duration: number = 45; // in minutes

type DATA_TYPE = {
  startTime: string;
  endTime: string;
};

type Fn_TYpe = () => DATA_TYPE[];

export const getAllSlotsTiming: Fn_TYpe = () => {
  const slots = [];
  let hour: number = startTime;
  let minute: number = 0;
  while (hour < endTime || !(hour === 23 && minute === 0)) {
    const startTime = `${hour < 10 ? "0" : ""}${hour}:${
      minute < 10 ? "0" : ""
    }${minute}`;
    const endTimeHour = hour + Math.floor((minute + 45) / 60);
    const endTimeMinute = (minute + duration) % 60;
    const endTime = `${endTimeHour < 10 ? "0" : ""}${endTimeHour}:${
      endTimeMinute < 10 ? "0" : ""
    }${endTimeMinute}`;
    const data: DATA_TYPE = {
      startTime,
      endTime,
    };
    hour = endTimeHour;
    minute = endTimeMinute;
    slots.push(data);
  }
  return slots;
};
