import {
  Box,
  Chip,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface BadgeDropdownProps {
  value: string | undefined;
  placeholder: string;
  onChange: (e: SelectChangeEvent) => void;
  dropdownOptions: string[];
}

const BadgeDropdown: React.FC<BadgeDropdownProps> = ({
  value,
  onChange,
  placeholder,
  dropdownOptions,
}) => {
  return (
    <Select
      placeholder="Destination Type"
      value={value}
      onChange={(e) => onChange(e)}
      input={<Input id="select-multiple-chip" disableUnderline />}
      displayEmpty
      renderValue={(value) => {
        if (value === undefined || value.length === 0) {
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              <Chip key={placeholder} label={placeholder} />
            </Box>
          );
        }

        return (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <Chip key={value} label={value} />
          </Box>
        );
      }}
    >
      {dropdownOptions.map((type) => (
        <MenuItem key={type} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
  );
};

export default BadgeDropdown;
