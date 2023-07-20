import { CheckboxMenu, CheckboxMenuItems } from "@components/CheckboxMenu";

import React from "react";

export type SelectFigJamSectionsProps = {
  sections: string[] | undefined;
  onChange(sections: string[] | undefined): void;
};

export const SelectFigJamSections: React.FC<SelectFigJamSectionsProps> = ({
  sections,
  onChange,
}) => {
  const handleChange = (items: string[]) => {
    onChange(items);
  };
  const sectionItems: CheckboxMenuItems<string> | undefined =
    sections?.map((section) => ({
      label: section,
      value: section,
    })) ?? undefined;

  return (
    <CheckboxMenu<string>
      label="Select Section"
      items={sectionItems ?? []}
      onChange={handleChange}
    />
  );
};
