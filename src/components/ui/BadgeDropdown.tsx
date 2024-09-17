import {
  Box,
  Chip,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";

interface BadgeDropdownProps {
  placeholder: string;
  onChange: (value: string) => void;
  dropdownOptions: string[];
}

const BadgeDropdown: React.FC<BadgeDropdownProps> = ({
  onChange,
  placeholder,
  dropdownOptions,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  function handleSelectedValueChange(e: SelectChangeEvent) {
    let selectedItem = e.target.value;
    onChange(selectedItem);
    setSelectedValue(selectedItem);
  }

  return (
    <Select
      placeholder="Destination Type"
      value={selectedValue}
      onChange={(e) => handleSelectedValueChange(e)}
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
