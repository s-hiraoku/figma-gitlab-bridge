import React, { useCallback, useState } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export type SelectedMenuItem<T extends string> = {
  label: React.ReactNode | string;
  value: T;
};

export type SelectedMenuItems<T extends string> = SelectedMenuItem<T>[];

export type SelectedMenuProps<T extends string> = {
  initialSelectedItem?: SelectedMenuItem<T>;
  items: SelectedMenuItems<T>;
  onChange: (event: SelectedMenuItem<T>) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  error?: boolean;
  helperText?: string;
};

export const SelectedMenu = <T extends string>({
  label,
  initialSelectedItem,
  items,
  onChange,
  ariaLabel,
  id,
  error,
  helperText,
}: SelectedMenuProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<
    SelectedMenuItem<T> | undefined
  >(initialSelectedItem ?? undefined);

  const handleChange = useCallback(
    (event: SelectChangeEvent<T>) => {
      const selectedItem = items.find(
        (item) => item.value === event.target.value
      );
      setSelectedItem(selectedItem as SelectedMenuItem<T> | undefined);
      if (selectedItem != null) {
        onChange(selectedItem as SelectedMenuItem<T>);
      }
    },
    [items, onChange]
  );

  return (
    <FormControl fullWidth variant="outlined" error={error}>
      <InputLabel htmlFor={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        value={selectedItem?.value}
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
