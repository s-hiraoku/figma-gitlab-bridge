import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useCallback, useState } from "react";

type Label = React.ReactNode | string;

export type CheckboxMenuItem<T extends string> = {
  label: Label;
  value: T;
};

export type CheckboxMenuItems<T extends string> = CheckboxMenuItem<T>[];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export type CheckboxListProps<T extends string> = {
  initialSelectedItems?: CheckboxMenuItems<T>;
  items: CheckboxMenuItems<T>;
  onChange: (event: T[]) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  error?: boolean;
  helperText?: string;
};

export const CheckboxMenu = <T extends string>({
  items,
  initialSelectedItems,
  onChange,
  label,
  ariaLabel,
  id,
  error,
  helperText,
}: CheckboxListProps<T>) => {
  const [selectedItemValues, setSelectedItemValues] = useState<T[]>(
    () => initialSelectedItems?.map((item) => item.value) ?? []
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent<T[]>) => {
      const selectedItems = event.target.value as T[];
      setSelectedItemValues(selectedItems);
      onChange(selectedItems);
    },
    [onChange]
  );
  return (
    <FormControl fullWidth variant="outlined" error={error}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        value={selectedItemValues}
        multiple
        onChange={handleChange}
        renderValue={(selected) =>
          (selected as unknown as Array<string>).join(", ")
        }
        input={<OutlinedInput label={label} />}
        inputProps={{
          name: "checkbox-menu",
          id,
          "aria-label": ariaLabel,
        }}
        MenuProps={MenuProps}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={selectedItemValues.indexOf(item.value) > -1} />
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
