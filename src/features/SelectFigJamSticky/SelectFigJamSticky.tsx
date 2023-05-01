import React from "react";
import { SelectedMenu } from "@components/SelectedMenu";
import { SelectChangeEvent } from "@mui/material";
import { SelectFigJamStickyLabel } from "./SelectFigJamStickyLabel";

const items = [
  {
    label: <SelectFigJamStickyLabel color={"#AFBCCF"} label={"Gray"} />,
    value: "#AFBCCF",
  },
  {
    label: <SelectFigJamStickyLabel color={"#E6E6E6"} label={"Light Gray"} />,
    value: "#E6E6E6",
  },
  {
    label: <SelectFigJamStickyLabel color={"#80CAFF"} label={"Blue"} />,
    value: "#80CAFF",
  },
  {
    label: <SelectFigJamStickyLabel color={"#9747FF"} label={"Purple"} />,
    value: "#9747FF",
  },
  {
    label: <SelectFigJamStickyLabel color={"#FFBDF2"} label={"Pink"} />,
    value: "#FFBDF2",
  },
  {
    label: <SelectFigJamStickyLabel color={"#FFAFA3"} label={"Red"} />,
    value: "#FFAFA3",
  },
  {
    label: <SelectFigJamStickyLabel color={"#FFC470"} label={"Orange"} />,
    value: "#FFC470",
  },
  {
    label: <SelectFigJamStickyLabel color={"#FFD966"} label={"Yellow"} />,
    value: "#FFD966",
  },
  {
    label: <SelectFigJamStickyLabel color={"#86E0A3"} label={"Green"} />,
    value: "#86E0A3",
  },
  {
    label: <SelectFigJamStickyLabel color={"#75D7F0"} label={"Blue Green"} />,
    value: "#75D7F0",
  },
];

export type SelectFigJamStickyProps = {
  onChange: (color: string) => void;
};

export const SelectFigJamSticky: React.FC<SelectFigJamStickyProps> = ({
  onChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };
  return (
    <SelectedMenu
      label="Select Sticky Color"
      items={items}
      onChange={handleChange}
    />
  );
};
