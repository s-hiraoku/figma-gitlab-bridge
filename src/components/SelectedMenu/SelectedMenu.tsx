import React, { useCallback, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export type SelectedMenuItem<T = string> = {
  label: React.ReactNode | string;
  value: T;
};

export type SelectedMenuItems<T = string> = SelectedMenuItem<T>[];

export type SelectedMenuProps = {
  initialSelectedItem?: SelectedMenuItem;
  items: SelectedMenuItems;
  onChange: (event: SelectChangeEvent<SelectedMenuItem["value"]>) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
};

export const SelectedMenu: React.FC<SelectedMenuProps> = ({
  label,
  initialSelectedItem,
  items,
  onChange,
  ariaLabel,
  id,
}) => {
  const [selectedItem, setSelectedItem] = useState<SelectedMenuItem["value"]>(
    initialSelectedItem ? initialSelectedItem.value : ""
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent<SelectedMenuItem["value"]>) => {
      setSelectedItem(event.target.value as SelectedMenuItem["value"]);
      onChange(event);
    },
    [onChange]
  );

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        value={selectedItem}
        onChange={handleChange}
        label={label}
        inputProps={{
          name: "select-menu",
          id,
          "aria-label": ariaLabel,
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
