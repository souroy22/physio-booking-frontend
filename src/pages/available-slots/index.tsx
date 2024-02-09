import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { getAvailableSlots } from "../../apis/slotApis";
import "./style.css";
import { getAllSlotsTiming } from "../../utils/getAllSlotsTable";
import { days } from "../../data/days";
import { convertTo12HourFormat } from "../../utils/formatTime12HoursFormat";
import CancelIcon from "@mui/icons-material/Cancel";
import SkeletonComp from "../../components/skeleton";

type TIME_TYPE = {
  startTime: string;
  endTime: string;
  id?: string;
};

const AvailableSlots = () => {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onLoad = async () => {
    setLoading(true);
    const data = await getAvailableSlots();
    setSlots(data.slots);
    setLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  const checkStatus = (time: TIME_TYPE, slots: any) => {
    console.log(`time ${time}, slots ${slots.startTime}`);
    return slots.filter(
      (slot: any) =>
        slot.startTime === time.startTime && slot.endTime === time.endTime
    ).length;
  };

  //   console.log("slots", slots);

  return (
    <>
      {!loading ? (
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
                      {days.map((day: any) => {
                        if (
                          slots[day] &&
                          checkStatus(slotTime, slots[day]?.slots)
                        ) {
                          console.log(
                            `time ${slotTime}, slots ${slots[day]?.slots}`
                          );

                          return (
                            <Box className="scheduled-status-data isScheduled center-align-text">
                              Available
                            </Box>
                          );
                        } else {
                          return (
                            <Box className="scheduled-status-data center-align-text">
                              <CancelIcon sx={{ color: "red" }} />
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
      ) : (
        <SkeletonComp
          count={1}
          height="90vh"
          width="95vw"
          style={{ margin: "0 auto" }}
        />
      )}
    </>
  );
};

export default AvailableSlots;
