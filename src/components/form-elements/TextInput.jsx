import { TextField } from "@mui/material";
const TextInput = ({ label, value, handleChange, required,disabled }) => {
  return (
    <TextField
      size="small"
      fullWidth
      label={label}
      required={required}
      disabled={disabled}
      value={value}
      onChange={handleChange}
    />
  );
};

export default TextInput;
