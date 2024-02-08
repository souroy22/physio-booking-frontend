export const convertTo12HourFormat = (timeStr: string) => {
  const timeParts = timeStr.split(":");
  let hours = parseInt(timeParts[0]);
  let minutes: number | string = parseInt(timeParts[1]);
  const suffix = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = hours + ":" + minutes + " " + suffix;
  return formattedTime;
};
