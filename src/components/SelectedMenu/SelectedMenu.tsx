import React, { useCallback, useState } from "react";
import {
  FormControl,
  FormHelperText,
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
  onChange: (event: SelectChangeEvent<SelectedMenuItem>) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  error?: boolean;
  helperText?: string;
};

const DEFAULT_ITEM = { label: "", value: "" };

export const SelectedMenu: React.FC<SelectedMenuProps> = ({
  label,
  initialSelectedItem,
  items,
  onChange,
  ariaLabel,
  id,
  error,
  helperText,
}) => {
  const [selectedItem, setSelectedItem] = useState<SelectedMenuItem>(
    initialSelectedItem ?? DEFAULT_ITEM
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent<SelectedMenuItem>) => {
      setSelectedItem(event.target.value as SelectedMenuItem);
      onChange(event);
    },
    [onChange]
  );

  return (
    <FormControl fullWidth variant="outlined" error={error}>
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
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
