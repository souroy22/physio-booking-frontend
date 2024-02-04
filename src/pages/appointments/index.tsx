import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./style.css";
import { useEffect } from "react";
import { getAppointments } from "../../apis/slotApis";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllAppointments } from "../../store/appointment/appointmentReducer";

const columns = [
  { label: "Start Time", value: "startTime" },
  { label: "End Time", value: "endTime" },
  { label: "Appointment Day", value: "day" },
  { label: "Doctor Name", value: "appointmentDoctor" },
  { label: "Remarks", value: "remarks" },
];

const Appointments = () => {
  const user = useSelector((state: RootState) => state.authReducer.user);
  const appointments = useSelector(
    (state: RootState) => state.appointmentReducer.appointments
  );

  const dispatch = useDispatch();

  const restructure = (data: any) => {
    return {
      startTime: data.startTime,
      endTime: data.endTime,
      day: data.day.day,
      appointmentDoctor: data.availableDoctor?.name || "",
      remarks: data.remarks,
    };
  };

  const onLoad = async () => {
    const data = await getAppointments(user.id);
    const restructureData: any = [];
    for (const d of data) {
      restructureData.push(restructure(d));
    }
    console.log("restructureData", restructureData);
    dispatch(getAllAppointments(restructureData));
  };

  useEffect(() => {
    onLoad();
  }, []);
  return (
    <Box className="appointment-list-section">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) => (
                <TableCell key={column.label}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment: any) => (
              <TableRow
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Appointments;
