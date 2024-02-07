import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getMySlots } from "../../apis/slotApis";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { addMySlots } from "../../store/slot/slotReducer";
import { RootState } from "../../store/store";
import { getAllSlotsTiming } from "../../utils/getAllSlotsTable";
import { days } from "../../data/days";

type TIME_TYPE = {
  startTime: string;
  endTime: string;
  id?: string;
};

const MySlots = () => {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const mySlots = useSelector((state: RootState) => state.slotReducer.mySlots);

  const dispatch = useDispatch();

  const onLoad = async () => {
    const data = await getMySlots();
    dispatch(addMySlots(data));
  };

  useEffect(() => {
    onLoad();
  }, []);

  const checkStatus = (time: TIME_TYPE, slots: TIME_TYPE[]) => {
    return slots.filter(
      (slot) =>
        slot.startTime === time.startTime && slot.endTime === time.endTime
    ).length;
  };

  return (
    <Box className="my-slots-container">
      <Box className="table">
        <Box className="days-heading">
          <Box
            className="day-heading-box selected center-align-text"
            sx={{ borderRight: "3px solid red", width: "200px" }}
          >
            Time / Period
          </Box>
          {days.map((day) => (
            <Box
              onClick={() => setSelectedDay(day)}
              className={`day-heading-box ${
                selectedDay === day ? "selected" : ""
              } center-align-text`}
            >
              {day}
            </Box>
          ))}
        </Box>
        <Box className="days-body">
          <Box>
            {getAllSlotsTiming().map((slotTime) => (
              <Box className="days-data-section">
                <Box className="days-data-section-leftbar center-align-text">
                  {slotTime.startTime} - {slotTime.endTime}
                </Box>
                <Box className="scheduled-status-section">
                  {days.map((day) => {
                    if (
                      mySlots[day] &&
                      checkStatus(slotTime, mySlots[day].slots)
                    ) {
                      return (
                        <Box className="scheduled-status-data isScheduled center-align-text">
                          Scheduled
                        </Box>
                      );
                    } else {
                      return (
                        <Box className="scheduled-status-data center-align-text">
                          Not Scheduled
                        </Box>
                      );
                    }
                  })}
                </Box>
              </Box>
            ))}
          </Box>
          {/* <Box>
            {getAllSlotsTiming().map((slotTime) => {
              return (
                <Box className="scheduled-status">
                  {days.map((day) => {
                    if (
                      mySlots[day] &&
                      checkStatus(slotTime, mySlots[day].slots)
                    ) {
                      return (
                        <Box className="scheduled-status-data center-align-text">
                          Scheduled
                        </Box>
                      );
                    } else {
                      return (
                        <Box className="scheduled-status-data center-align-text">
                          Not Scheduled
                        </Box>
                      );
                    }
                  })}
                </Box>
              );
            })}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default MySlots;
