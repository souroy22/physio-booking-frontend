import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
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
import CheckIcon from "@mui/icons-material/Check";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getUserByEmailId } from "../../apis/userApis";

const BookingPage = () => {
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verifyEmail, setVerifyEmail] = useState<boolean | string>(false);

  const [searchParams] = useSearchParams();

  const slots = useSelector((state: RootState) => state.slotReducer.slots);
  const user = useSelector((state: RootState) => state.authReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = searchParams.get("id") || "";
  const timing = searchParams.get("timing") || "";

  const onLoad = async () => {
    const result = await getAvailableSlots(id, timing);
    dispatch(setSlots(result.slots));
  };

  const selectSlot = (name: string, value: string) => {
    if (name === "slot-day") {
      setSelectedSlot(value);
    } else {
      setSelectedTime(value);
    }
  };

  const handleClick = async () => {
    // const slotDayId = selectedSlot.split("/")[1];
    const slotTimeId = selectedTime.split("/")[1];
    let userId = "";
    if (user.isAdmin === "Saler" && typeof verifyEmail === "string") {
      userId = verifyEmail;
      // console.log(`Slot day id - ${slotDayId}, Slot Time id - ${slotTimeId}`);
    } else {
      userId = user.id;
    }
    await bookSlot(slotTimeId, userId, remarks);
    navigate("/");
  };

  useEffect(() => {
    onLoad();
  }, [timing]);

  const formattedSlots: { name: string }[] = Object.keys(slots).map(
    (slot: any) => {
      return { name: slot, value: slots[slot].id };
    }
  );

  const checkUser = async () => {
    const user = await getUserByEmailId(email);
    if (user) {
      setVerifyEmail(user._id);
    }
  };

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
            name="slot-day"
            placeholder="Select days"
            options={formattedSlots}
            handleChange={selectSlot}
            selectedValue={selectedSlot}
          />
          <Dropdown
            name="slot-filter"
            placeholder="Select Filter"
            options={[
              { name: "Morning" },
              { name: "After_Noon" },
              { name: "Evening" },
            ]}
            handleChange={(_, value: string) => {
              const params: any = {};
              if (id) {
                params["id"] = searchParams.get("id");
              }
              params["timing"] = value;
              navigate({
                pathname: location.pathname,
                search: `?${createSearchParams(params)}`,
              });
            }}
            selectedValue={searchParams.get("timing") || ""}
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
                value={email}
                onChange={(event) => {
                  setVerifyEmail(false);
                  setEmail(event.target.value);
                }}
              />

              <Box>
                {!verifyEmail ? (
                  <Tooltip title="Click to verify">
                    <CheckIcon
                      onClick={checkUser}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Verified mail">
                    <VerifiedIcon />
                  </Tooltip>
                )}
              </Box>
            </Box>
          )}
          <TextField
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
          />

          <Button
            disabled={user.isAdmin === "Saler" && !verifyEmail}
            variant="contained"
            onClick={handleClick}
          >
            Book
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default BookingPage;
