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

const ChooseSlots = () => {
  const [selectedTiming, setSelectedTiming] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.authReducer.user);

  const slots = useSelector((state: RootState) => state.slotReducer.slots);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoad = async () => {
    const result: any = await getUnscheduleSlots();
    dispatch(setSlots(result));
  };

  const handleClick = (value: string[]) => {
    setSelectedTiming(value);
  };

  const onClick = async () => {
    setLoading(true);
    const timing: any = {};
    for (const time of selectedTiming) {
      if (!timing.hasOwnProperty(time.split("/")[0])) {
        timing[time.split("/")[0]] = [time.split("/")[2]];
      } else {
        timing[time.split("/")[0]] = [
          ...timing[time.split("/")[0]],
          time.split("/")[2],
        ];
      }
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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Slot Timing</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(slots).map((slot) => (
                <TableRow
                  key={slot}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{slot}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className="bottom-section">
        <Button variant="contained" onClick={onClick}>
          {loading ? (
            <CircularProgress
              sx={{ width: "20px !important", height: "20px !important" }}
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
