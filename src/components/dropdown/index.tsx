import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./style.css";

type OptionType = {
  name: string;
  value?: string;
};

type PropType = {
  selectedValue: string;
  placeholder: string;
  handleChange: (name: string, value: string) => void;
  options: OptionType[];
  name: string;
};

const Dropdown = ({
  selectedValue,
  placeholder,
  handleChange,
  options,
  name,
}: PropType) => {
  return (
    <Box sx={{ marginBottom: "20px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{placeholder}</InputLabel>
        <Select
          sx={{ height: "50px", minHeight: "50px" }}
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label={placeholder}
          onChange={(event: SelectChangeEvent) =>
            handleChange(event.target.name, event.target.value)
          }
        >
          {options.map((option) => (
            <MenuItem
              value={
                option.value ? `${option.name}/${option.value}` : option.name
              }
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
