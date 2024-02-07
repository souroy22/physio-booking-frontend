import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { bookSlot, getAvailableSlots } from "../../apis/slotApis";
import { useDispatch, useSelector } from "react-redux";
import { setSlots } from "../../store/slot/slotReducer";
import { RootState } from "../../store/store";
import Dropdown from "../../components/dropdown";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getUserByEmailId } from "../../apis/userApis";
import SkeletonComp from "../../components/skeleton";
import notification from "../../config/notification";
import { verifyEmailID } from "../../utils/verifyEmail";
import { getDoctors } from "../../apis/doctorApis";

type STATE_TYPE = { name: string; value: string };

const BookingPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<STATE_TYPE | null>(null);

  const [selectedDoctor, setSelectedDoctor] = useState<STATE_TYPE | null>(null);
  const [doctors, setDoctors] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState<STATE_TYPE | null>(null);
  const [availableSlots, setAvailableSlots] = useState<STATE_TYPE[]>([]);

  const [fakeUpdate, setFakeUpdate] = useState<boolean>(false);

  const [selectedTime, setSelectedTime] = useState<STATE_TYPE | null>(null);
  const [availabletiming, setAvailabletiming] = useState<STATE_TYPE[]>([]);
  const [remarks, setRemarks] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verifyEmail, setVerifyEmail] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitForm, setSubmitForm] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const slots = useSelector((state: RootState) => state.slotReducer.slots);
  const user = useSelector((state: RootState) => state.authReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatSlots = (slots: any) => {
    const formattedSlots: any = [];
    for (const slot of Object.keys(slots)) {
      formattedSlots.push({ name: slot, value: slot });
    }
    return formattedSlots;
  };

  const formatTime = (slots: any) => {
    const formattedTime: { name: string; value: string }[] = slots.map(
      (s: any) => {
        return { name: `${s.startTime} to ${s.endTime}`, value: s.id };
      }
    );
    return formattedTime;
  };

  const onChangeSlot = (_: string, value: STATE_TYPE) => {
    setSelectedSlot(value);
    setAvailabletiming(formatTime(slots[value.name].slots));
  };

  const getSlotData = async (id: string = "", timing: string = "") => {
    const result = await getAvailableSlots(id, timing);
    setAvailableSlots(formatSlots(result.slots));
    dispatch(setSlots(result.slots));
  };

  const onLoad = async () => {
    setLoading(true);
    const data: any = await getDoctors();
    const formattedData = data.map((d: any) => {
      return { name: d.name, value: d._id };
    });
    setDoctors(formattedData);
    setLoading(false);
  };

  const selectSlot = (_: string, value: STATE_TYPE) => {
    setSelectedTime(value);
  };

  const handleClick = async () => {
    if (!selectedDoctor?.value) {
      notification.error("Please choose a doctor");
      return;
    }
    if (!selectedSlot?.value) {
      notification.error("Please select a day");
      return;
    }
    if (!selectedTime) {
      notification.error("Please select a time slot");
      return;
    }
    if (!remarks.trim()) {
      notification.error("Please type some remarks");
      return;
    }
    setSubmitForm(true);
    const slotTimeId = selectedTime.value;
    let userId = "";
    if (user.isAdmin === "Saler" && typeof verifyEmail === "string") {
      userId = verifyEmail;
    } else {
      notification.error("You are Not Authorized");
      return;
    }
    await bookSlot(slotTimeId, userId, remarks, selectedDoctor?.value);
    setSubmitForm(false);
    navigate("/");
  };

  const checkUser = async () => {
    if (!verifyEmailID(email)) {
      notification.error("Please type a valid email id");
      return;
    }
    setVerifyEmail("loading");
    const user = await getUserByEmailId(email);
    if (!user) {
      setVerifyEmail(false);
      return;
    }
    setVerifyEmail(user._id);
  };

  const handleFilter = async (_: string, value: STATE_TYPE) => {
    setDataLoading(true);
    setSelectedFilter(value);
    setSelectedDoctor(() => null);
    setSelectedSlot(null);
    setSelectedTime(null);
    setAvailableSlots([]);
    setAvailabletiming([]);
    // await getSlotData(selectedDoctor?.value, value.value);
    setDataLoading(false);
    setFakeUpdate(!fakeUpdate);
  };

  const onSelectedDoctor = async (_: string, value: STATE_TYPE) => {
    setDataLoading(true);
    setSelectedDoctor(value);
    setSelectedSlot(null);
    setSelectedTime(null);
    setAvailableSlots([]);
    setAvailabletiming([]);
    await getSlotData(value.value, selectedFilter?.value);
    setDataLoading(false);
  };

  useEffect(() => {
    onLoad();
  }, []);

  if (loading) {
    return (
      <Box className="skeleton-wraapper">
        <SkeletonComp width="350px" height="500px" count={1} />
      </Box>
    );
  }

  return (
    <Box className="booking-form-container">
      <Box className="booking-form">
        <Typography className="form-title">Book Appointment</Typography>
        <Dropdown
          name="slot-filter"
          placeholder="Select Filter"
          options={[
            { name: "Morning", value: "Morning" },
            { name: "After Noon", value: "After_Noon" },
            { name: "Evening", value: "Evening" },
          ]}
          handleChange={handleFilter}
          selectedValue={selectedFilter}
        />
        <Dropdown
          name="doctor"
          placeholder="Select Doctor"
          options={doctors}
          handleChange={onSelectedDoctor}
          selectedValue={selectedDoctor}
        />
        <Dropdown
          name="slot-day"
          placeholder="Select days"
          options={availableSlots}
          handleChange={onChangeSlot}
          selectedValue={selectedSlot}
          loading={dataLoading}
        />
        <Dropdown
          name="slot-time"
          placeholder="Select time"
          options={availabletiming}
          handleChange={selectSlot}
          selectedValue={selectedTime}
          loading={dataLoading}
        />

        {user.isAdmin === "Saler" && (
          <Box className="form-verify-user">
            <TextField
              required
              autoComplete="off"
              value={email}
              placeholder="Type User Emailid"
              onChange={(event) => {
                setVerifyEmail(false);
                setEmail(event.target.value);
              }}
            />

            <Box sx={{ display: "flex" }}>
              {!verifyEmail || verifyEmail === "loading" ? (
                <Tooltip title="Click to verify">
                  <Button
                    onClick={checkUser}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "green",
                      color: "#FFF",
                      transition: "all 0.4s ease-in-out",
                      "&:hover": {
                        backgroundColor: "green",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {verifyEmail === "loading" ? (
                      <CircularProgress
                        sx={{
                          color: "#FFF",
                          height: "24px !important",
                          width: "24px !important",
                        }}
                      />
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Email Verified">
                  <VerifiedIcon sx={{ color: "navy" }} />
                </Tooltip>
              )}
            </Box>
          </Box>
        )}
        <TextField
          placeholder="Add remarks"
          value={remarks}
          onChange={(event) => setRemarks(event.target.value)}
        />

        <Button
          disabled={!(verifyEmail && verifyEmail !== "loading")}
          variant="contained"
          onClick={handleClick}
        >
          {submitForm ? (
            <CircularProgress
              sx={{
                color: "#FFF",
                height: "20px !important",
                width: "20px !important",
              }}
            />
          ) : (
            "Book"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default BookingPage;
