import { CheckboxMenu, CheckboxMenuItems } from "@components/CheckboxMenu";
import { Sections } from "@features/contents/FigmaStickyToGitLabIssues/types";

import React from "react";

export type SelectFigJamSectionsProps = {
  sections: Sections;
  onChange(sections: Sections): void;
  disabled: boolean;
  error: boolean;
  helperText: string;
  resetSelectedItems: boolean;
};

export const SelectFigJamSections: React.FC<SelectFigJamSectionsProps> = ({
  sections,
  onChange,
  error,
  disabled,
  helperText,
  resetSelectedItems,
}) => {
  const handleChange = (items: Sections) => {
    onChange(items);
  };
  const sectionItems: CheckboxMenuItems<string> | undefined =
    sections?.map((section) => ({
      label: section,
      value: section,
    })) ?? undefined;

  return (
    <CheckboxMenu<string>
      initialSelectedItems={resetSelectedItems ? [] : undefined}
      label="Select Section"
      items={sectionItems ?? []}
      onChange={handleChange}
      disabled={disabled}
      error={error}
      helperText={helperText}
    />
  );
};
