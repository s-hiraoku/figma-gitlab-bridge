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
  onChange: (event: SelectedMenuItem) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  error?: boolean;
  helperText?: string;
};

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
  const [selectedItem, setSelectedItem] = useState<
    SelectedMenuItem | undefined
  >(initialSelectedItem ?? undefined);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const selectedItem = items.find(
        (item) => item.value === event.target.value
      );
      setSelectedItem(selectedItem);
      if (selectedItem != null) {
        onChange(selectedItem);
      }
    },
    [items, onChange]
  );

  return (
    <FormControl fullWidth variant="outlined" error={error}>
      <InputLabel htmlFor={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        defaultValue={selectedItem?.value}
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
