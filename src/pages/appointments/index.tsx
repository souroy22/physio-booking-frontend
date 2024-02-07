import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAppointments } from "../../apis/slotApis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllAppointments } from "../../store/appointment/appointmentReducer";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import "./style.css";

const columns = [
  { label: "Start Time", value: "startTime" },
  { label: "End Time", value: "endTime" },
  { label: "Appointment Day", value: "day" },
  { label: "Doctor Name", value: "appointmentDoctor" },
  { label: "Remarks", value: "remarks" },
];

const Appointments = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.authReducer.user);
  const appointments = useSelector(
    (state: RootState) => state.appointmentReducer.appointments
  );

  const dispatch = useDispatch();

  const restructure = (data: any) => {
    console.log("data", data);
    return {
      startTime: data.slot.startTime,
      endTime: data.slot.endTime,
      day: data.slot.day.day,
      appointmentDoctor: data.doctor?.name || "",
      remarks: data.remarks,
    };
  };

  const onLoad = async () => {
    setLoading(true);
    try {
      const data = await getAppointments(user.id);
      const restructureData: any = [];
      for (const d of data) {
        restructureData.push(restructure(d));
      }

      dispatch(getAllAppointments(restructureData));
    } catch (error) {
      console.log("ERROR");
    }
    setLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);
  return (
    <Box className="appointment-list-section">
      <TableContainer
        component={Paper}
        sx={screen.availWidth > 750 ? { width: "60%", margin: "0 auto" } : {}}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell key={column.label}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableCell colSpan={6} align="center" sx={{ height: "100px" }}>
                <CircularProgress
                  sx={{
                    height: "30px !important",
                    width: "30px !important",
                    color: "navy",
                  }}
                />
              </TableCell>
            ) : !appointments.length ? (
              <TableCell
                colSpan={6}
                align="center"
                sx={{
                  height: "100px",
                  fontSize: "25px",
                  fontWeight: 600,
                  color: "gray",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  No Previous Appointment <SentimentDissatisfiedIcon />
                </Box>
              </TableCell>
            ) : (
              appointments.map((appointment: any, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <>
                    {columns.map((col: any) => (
                      <TableCell key={col.label}>
                        {appointment[col.value]}
                      </TableCell>
                    ))}
                  </>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Appointments;
