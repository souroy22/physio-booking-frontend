const startTime: number = 5; // 24 hours format
const endTime: number = 23; // 24 hours format
const duration: number = 45; // in minutes
const gap: number = 15; // gap in between every slot

type DATA_TYPE = {
  startTime: string;
  endTime: string;
};

type Fn_TYpe = () => DATA_TYPE[];

export const getAllSlotsTiming: Fn_TYpe = () => {
  const slots = [];
  let hour: number = startTime;
  let minute: number = 0;
  while (!(hour === endTime && minute === 0)) {
    const startTimeFormatted = `${hour < 10 ? "0" : ""}${hour}:${
      minute < 10 ? "0" : ""
    }${minute}`;

    // Calculate end time
    let endTimeHour = hour;
    let endTimeMinute = minute + duration;
    if (endTimeMinute >= 60) {
      endTimeHour += Math.floor(endTimeMinute / 60);
      endTimeMinute %= 60;
    }
    const endTimeFormatted = `${endTimeHour < 10 ? "0" : ""}${endTimeHour}:${
      endTimeMinute < 10 ? "0" : ""
    }${endTimeMinute}`;

    const data = {
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
    };

    // Move to next time slot
    minute += gap;
    if (minute >= 60) {
      minute %= 60;
      hour++;
    }
    slots.push(data);
  }
  return slots;
};
