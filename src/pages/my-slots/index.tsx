import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getMySlots } from "../../apis/slotApis";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { addMySlots } from "../../store/slot/slotReducer";
import { RootState } from "../../store/store";
import { getAllSlotsTiming } from "../../utils/getAllSlotsTable";
import { days } from "../../data/days";
import { convertTo12HourFormat } from "../../utils/formatTime12HoursFormat";
import { formatTime } from "../../utils/formatTime";
import SkeletonComp from "../../components/skeleton";

type TIME_TYPE = {
  startTime: string;
  endTime: string;
  id?: string;
};

const MySlots = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const mySlots = useSelector((state: RootState) => state.slotReducer.mySlots);

  const dispatch = useDispatch();

  const onLoad = async () => {
    setLoading(true);
    const data = await getMySlots();
    dispatch(addMySlots(data));
    setLoading(false);
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

  const isInBetweenSelectedSlots = (time: TIME_TYPE, slots: TIME_TYPE[]) => {
    return slots.filter(
      (slot) =>
        formatTime(time.startTime) < formatTime(slot.endTime) &&
        formatTime(time.endTime) > formatTime(slot.startTime)
    ).length;
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <SkeletonComp
          count={1}
          height="90vh"
          width="95vw"
          style={{ margin: "0 auto", marginTop: "20px" }}
        />
      </Box>
    );
  }

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
            <Box className={`day-heading-box center-align-text`}>{day}</Box>
          ))}
        </Box>
        <Box className="days-body">
          <Box>
            {getAllSlotsTiming().map((slotTime) => (
              <Box className="days-data-section">
                <Box className="days-data-section-leftbar center-align-text">
                  {convertTo12HourFormat(slotTime.startTime)} -{" "}
                  {convertTo12HourFormat(slotTime.endTime)}
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
                      if (
                        mySlots[day] &&
                        isInBetweenSelectedSlots(slotTime, mySlots[day].slots)
                      ) {
                        return (
                          <Box className="scheduled-status-data not-allowed center-align-text">
                            Not Allowed
                          </Box>
                        );
                      }
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
        </Box>
      </Box>
    </Box>
  );
};

export default MySlots;
