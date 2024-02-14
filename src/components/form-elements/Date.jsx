import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function DateInput({ label, value, handleChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{ paddingTop: "0", overflow: "unset" }}
      >
        <DatePicker
          label={label}
          fullWidth
          value={dayjs(value)}
          format="DD-MM-YYYY"
          slotProps={{ textField: { size: "small" } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
