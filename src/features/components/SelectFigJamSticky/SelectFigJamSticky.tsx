import React from "react";
import { SelectedMenu } from "@components/SelectedMenu";
import { SelectFigJamStickyLabel } from "./SelectFigJamStickyLabel";
import {
  FigJamColorLabel,
  FIGJAM_COLOR_VALUE,
  FigJamColor,
  FigJamColorValue,
} from "../../contents/FigmaStickyToGitLabIssues/types";
import { SelectedMenuItem } from "@components/SelectedMenu";

const items = Object.entries(FIGJAM_COLOR_VALUE).map(([label, value]) => {
  return {
    label: (
      <SelectFigJamStickyLabel
        color={value}
        label={label as FigJamColorLabel}
      />
    ),
    value: value,
  };
});

const HELPER_TEXT = "";
const ERROR_MESSAGE = "Please select a color for the sticky note.";

export type SelectFigJamStickyProps = {
  error?: boolean;
  onChange: (color: FigJamColor) => void;
};

export const SelectFigJamSticky: React.FC<SelectFigJamStickyProps> = ({
  error = false,
  onChange,
}) => {
  const handleChange = (item: SelectedMenuItem<FigJamColorValue>) => {
    onChange(item as unknown as FigJamColor);
  };
  return (
    <SelectedMenu<FigJamColorValue>
      id="select-figjam-sticky"
      initialSelectedItem={items[0]}
      error={error}
      label="Select Sticky Color"
      items={items}
      onChange={handleChange}
      helperText={error ? ERROR_MESSAGE : HELPER_TEXT}
    />
  );
};
