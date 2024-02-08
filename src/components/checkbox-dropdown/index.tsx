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

type TimingType = string[];

type PropTypes = {
  timings: { startTime: string; endTime: string; id: string }[];
  placeholder: string;
  handleClick: (value: string[]) => void;
  day?: string;
  selectedTiming: string[];
};

const CheckboxDropdown = ({
  timings,
  handleClick,
  placeholder,
  day,
  selectedTiming,
}: PropTypes) => {
  const handleChange = (event: SelectChangeEvent<TimingType>) => {
    const {
      target: { value },
    } = event;
    handleClick(typeof value === "string" ? value.split(",") : value);
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
          {timings.map((time) => (
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
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CheckboxDropdown;
