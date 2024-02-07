import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./style.css";

export type OptionType = {
  name: string;
  value: string;
};

type PropType = {
  selectedValue: OptionType | null;
  placeholder: string;
  handleChange: (name: string, value: OptionType) => void;
  options: OptionType[];
  name: string;
  loading?: boolean;
};

const Dropdown = ({
  selectedValue,
  placeholder,
  handleChange,
  options,
  name,
  loading = false,
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
          value={selectedValue?.value || null}
          label={placeholder}
        >
          {!loading ? (
            options.length ? (
              options.map((option) => (
                <MenuItem
                  onClick={(event: any) =>
                    handleChange(event.target.name, option)
                  }
                  value={option.value}
                >
                  {option.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No Data Available</MenuItem>
            )
          ) : (
            <MenuItem
              disabled
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <CircularProgress sx={{ color: "navy", opacity: 1 }} />
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
