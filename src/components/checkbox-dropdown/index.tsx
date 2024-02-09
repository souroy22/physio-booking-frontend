import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box, Chip } from "@mui/material";
import { convertTo12HourFormat } from "../../utils/formatTime12HoursFormat";
import "./style.css";
import { formatTime } from "../../utils/formatTime";

type TimingType = string[];

type PropTypes = {
  timings: { startTime: string; endTime: string; id: string }[];
  placeholder: string;
  handleClick: (value: string[]) => void;
  day?: string;
  selectedTiming: string[];
  selectedSlots?: any;
};

const CheckboxDropdown = ({
  timings,
  handleClick,
  placeholder,
  day,
  selectedTiming,
  selectedSlots,
}: PropTypes) => {
  const handleChange = (event: SelectChangeEvent<TimingType>) => {
    const {
      target: { value },
    } = event;
    handleClick(typeof value === "string" ? value.split(",") : value);
  };

  const getFilteredOptions = (option: any, index: number) => {
    if (selectedSlots) {
      for (const s of selectedSlots) {
        if (
          formatTime(option.startTime) < formatTime(s.endTime) &&
          formatTime(option.endTime) > formatTime(s.startTime)
        ) {
          return false;
        }
      }
    }
    if (!selectedTiming.length) {
      return true;
    }
    const isPresent = selectedTiming.filter(
      (time: any) => time.split("/")[0] === day
    );
    console.log("selectedSlots ----", selectedSlots);
    if (!isPresent.length) {
      return true;
    }
    const newOption: any = `${day}/${option.startTime} - ${option.endTime}/${option.id}`;
    const selectedOptionsIndex = selectedTiming.indexOf(newOption);
    if (selectedOptionsIndex >= 0) {
      return true;
    }
    let shouldShow = true;
    const allOptions: any = timings.map(
      (time: any) => `${day}/${time.startTime} - ${time.endTime}/${time.id}`
    );
    for (const sOption of selectedTiming) {
      const sOptionIndex = allOptions.indexOf(sOption);
      if (Math.abs(index - sOptionIndex) <= 2) {
        shouldShow = false;
        break;
      }
    }
    return shouldShow;
  };

  return (
    <Box>
      <FormControl sx={{ m: 1 }} className="checkbox-form-controller">
        <InputLabel id="demo-multiple-checkbox-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedTiming}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <>
                  {value.split("/")[0] === day && (
                    <Chip key={value} label={value.split("/")[1]} />
                  )}
                </>
              ))}
            </Box>
          )}
        >
          {timings.map((time: any, index: number) => {
            if (!getFilteredOptions(time, index)) {
              return null;
            }
            return (
              <MenuItem
                key={time.id}
                value={`${day}/${time.startTime} - ${time.endTime}/${time.id}`}
              >
                <Checkbox
                  checked={
                    selectedTiming.indexOf(
                      `${day}/${time.startTime} - ${time.endTime}/${time.id}`
                    ) > -1
                  }
                />
                <ListItemText
                  primary={`${convertTo12HourFormat(
                    time.startTime
                  )} - ${convertTo12HourFormat(time.endTime)}`}
                  sx={{ "& span": { fontWeight: 500 } }}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CheckboxDropdown;
