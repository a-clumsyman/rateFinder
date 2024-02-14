import {
    InputLabel,
    Select,
    FormControl,
    MenuItem,
  } from "@mui/material";
const Choose = ({ label, value, handleChange, required, options }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleChange}
        defaultValue={-1}
        required={required}
        size="small"
      >
        <MenuItem value={-1} disabled>
          Choose
        </MenuItem>
        {options.map((option, i) => (
          <MenuItem value={i} key={`${label}-${i}`}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Choose;
