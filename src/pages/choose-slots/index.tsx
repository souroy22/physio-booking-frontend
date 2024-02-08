import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./style.css";
import CheckboxDropdown from "../../components/checkbox-dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getUnscheduleSlots, scheduledSlots } from "../../apis/slotApis";
import { setSlots } from "../../store/slot/slotReducer";
import { useNavigate } from "react-router-dom";
import notification from "../../config/notification";
import SkeletonComp from "../../components/skeleton";

const ChooseSlots = () => {
  const [selectedTiming, setSelectedTiming] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.authReducer.user);

  const slots = useSelector((state: RootState) => state.slotReducer.slots);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoad = async () => {
    setInitialLoading(true);
    const result: any = await getUnscheduleSlots();
    dispatch(setSlots(result));
    setInitialLoading(false);
  };

  const handleClick = (value: string[]) => {
    setSelectedTiming(value);
  };

  const onClick = async () => {
    setLoading(true);
    const timing: string[] = [];
    if (!selectedTiming.length) {
      setLoading(false);
      notification.error("Please select atleast one slot");
      return;
    }
    for (const time of selectedTiming) {
      timing.push(time.split("/")[2]);
    }
    await scheduledSlots(user.id, timing);
    setLoading(false);
    navigate("/");
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Box className="booking-container">
      <Box className="booking-title">Select Your Timing for this week</Box>
      <Box className="booking-description">
        Choose your available slots for this current week. Select those slots
        when you can available
      </Box>
      <Box className="booking-table">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="table-heading-cell day-cell">
                  Day
                </TableCell>
                <TableCell className="table-heading-cell">
                  Slot Timing
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialLoading ? (
                <TableCell colSpan={2} className="loading-table-cell">
                  <SkeletonComp height="400px" count={1} />
                </TableCell>
              ) : (
                Object.keys(slots).map((slot) => (
                  <TableRow
                    key={slot}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="day-name-cell">{slot}</TableCell>
                    <TableCell>
                      <CheckboxDropdown
                        selectedTiming={selectedTiming}
                        day={slots[slot].id}
                        placeholder="Select Timings"
                        timings={slots[slot].slots}
                        handleClick={handleClick}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className="bottom-section">
        <Button
          sx={{ minWidth: "150px" }}
          variant="contained"
          onClick={onClick}
        >
          {loading ? (
            <CircularProgress
              sx={{
                width: "20px !important",
                height: "20px !important",
                color: "#FFF",
              }}
            />
          ) : (
            "Schedule Slots"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default ChooseSlots;
