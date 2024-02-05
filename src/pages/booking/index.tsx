import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import "./style.css";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
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

const BookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verifyEmail, setVerifyEmail] = useState<boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitForm, setSubmitForm] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const slots = useSelector((state: RootState) => state.slotReducer.slots);
  const user = useSelector((state: RootState) => state.authReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = searchParams.get("id") || "";
  const timing = searchParams.get("timing") || "";

  const getSlotData = async () => {
    const result = await getAvailableSlots(id, timing);
    dispatch(setSlots(result.slots));
  };

  const onLoad = async () => {
    setLoading(true);
    await getSlotData();
    setLoading(false);
  };

  const selectSlot = (name: string, value: string) => {
    if (name === "slot-day") {
      setSelectedSlot(value);
    } else {
      setSelectedTime(value);
    }
  };

  const handleClick = async () => {
    if (!selectedSlot.trim()) {
      notification.error("Please select day");
      return;
    }
    if (!selectedTime.trim()) {
      notification.error("Please select time");
      return;
    }
    if (!remarks.trim()) {
      notification.error("Please type some remarks");
      return;
    }
    setSubmitForm(true);
    const slotTimeId = selectedTime.split("/")[1];
    let userId = "";
    if (user.isAdmin === "Saler" && typeof verifyEmail === "string") {
      userId = verifyEmail;
    } else {
      userId = user.id;
    }
    await bookSlot(slotTimeId, userId, remarks);
    setSubmitForm(false);
    navigate("/");
  };

  const formattedSlots: { name: string }[] = Object.keys(slots).map(
    (slot: any) => {
      return { name: slot, value: slots[slot].id };
    }
  );

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

  const handleFilter = async (_: string, value: string) => {
    const params: any = {};
    if (id) {
      params["id"] = searchParams.get("id");
    }
    params["timing"] = value;
    navigate({
      pathname: location.pathname,
      search: `?${createSearchParams(params)}`,
    });
    await getSlotData();
  };

  console.log("kjsdjkjk");

  useEffect(() => {
    onLoad();
  }, []);

  if (loading) {
    return (
      <Box className="skeleton-wraapper">
        <SkeletonComp width="300px" height="500px" count={1} />
      </Box>
    );
  }

  const formattedTime: { name: string }[] = slots[selectedSlot.split("/")[0]]
    ? slots[selectedSlot.split("/")[0]].slots.map((slot: any) => {
        return { name: `${slot.startTime} - ${slot.endTime}`, value: slot.id };
      })
    : [];

  return (
    <Box className="booking-form-container">
      {!Object.keys(slots).length ? (
        <Box>No Slots available with this filter</Box>
      ) : (
        <Box className="booking-form">
          <Typography className="form-title">Book Appointment</Typography>
          <Dropdown
            name="slot-filter"
            placeholder="Select Filter"
            options={[
              { name: "Morning" },
              { name: "After_Noon" },
              { name: "Evening" },
            ]}
            handleChange={handleFilter}
            selectedValue={searchParams.get("timing") || ""}
          />
          <Dropdown
            name="slot-day"
            placeholder="Select days"
            options={formattedSlots}
            handleChange={selectSlot}
            selectedValue={selectedSlot}
          />
          <Dropdown
            name="slot-time"
            placeholder="Select time"
            options={formattedTime}
            handleChange={selectSlot}
            selectedValue={selectedTime}
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
      )}
    </Box>
  );
};

export default BookingPage;
