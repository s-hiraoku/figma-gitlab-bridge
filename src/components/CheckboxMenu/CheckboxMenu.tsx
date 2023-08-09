import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";

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
  disabled?: boolean;
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
  disabled = false,
  label,
  ariaLabel,
  id,
  error,
  helperText,
}: CheckboxListProps<T>) => {
  const [selectedItemValues, setSelectedItemValues] = useState<T[]>(
    () => initialSelectedItems?.map((item) => item.value) ?? []
  );
  const [searchText, setSearchText] = useState("");

  const handleChange = useCallback(
    (event: SelectChangeEvent<T[]>) => {
      const selectedItems = event.target.value as T[];
      setSelectedItemValues(selectedItems);
      onChange(selectedItems);
    },
    [onChange]
  );

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        String(item.value).toLowerCase().includes(searchText.toLowerCase())
      ),
    [items, searchText]
  );

  const handleChangeSearchText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      setSearchText(event.target.value);
    },
    []
  );

  return (
    <FormControl fullWidth variant="outlined" error={error} disabled={disabled}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        value={selectedItemValues}
        multiple
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        input={<OutlinedInput label={label} />}
        inputProps={{
          name: "checkbox-menu",
          id,
          "aria-label": ariaLabel,
        }}
        MenuProps={MenuProps}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            value={searchText}
            onChange={handleChangeSearchText}
            disabled={disabled}
            size="small"
            inputProps={{
              "aria-label": "Search",
              role: "searchbox",
            }}
          />
        </Box>
        {filteredItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Checkbox checked={selectedItemValues.indexOf(item.value) > -1} />
            <Box
              sx={{
                whiteSpace: "normal",
                wordWrap: "break-word",
                width: "100%",
              }}
            >
              {item.label}
            </Box>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
