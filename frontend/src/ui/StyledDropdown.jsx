import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function StyledDropdown({ label, value, options, onChange, ...props }) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
