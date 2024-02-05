import { Avatar, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../store/doctor/doctorReducer";
import { getDoctors } from "../../apis/doctorApis";
import { setLoader } from "../../store/global/globalReducer";
import { RootState } from "../../store/store";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./style.css";

const DoctorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doctors = useSelector(
    (state: RootState) => state.doctorReducer.doctors
  );

  const onLoad = async () => {
    dispatch(setLoader(true));
    try {
      const result = await getDoctors();
      dispatch(getAllDoctors(result));
    } catch (error) {
      console.log("Error");
    }
    dispatch(setLoader(false));
  };

  useEffect(() => {
    onLoad();
  }, []);

  if (!doctors || !doctors.length) {
    return (
      <Box className="doctor-section" sx={{ alignItems: "center" }}>
        <h2 style={{ color: "gray" }}>No doctors found!</h2>
      </Box>
    );
  }

  return (
    <Box className="doctor-section">
      {doctors.map((doctor) => (
        <Box className="doctor-card">
          <Avatar alt={doctor.name} src={doctor.avatar || ""} />
          <Box>{doctor.name}</Box>
          <Box>{doctor.email}</Box>
          <Button
            variant="contained"
            onClick={() =>
              navigate({
                pathname: "/book-appointment",
                search: `?${createSearchParams({ id: doctor.id })}`,
              })
            }
          >
            Book Appointment
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default DoctorPage;
