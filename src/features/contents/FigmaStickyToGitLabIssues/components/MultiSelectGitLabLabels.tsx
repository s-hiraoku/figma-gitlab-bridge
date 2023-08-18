import React, { useMemo } from "react";
import { CheckboxMenu } from "@components/CheckboxMenu";
import { useGitLabLabels } from "@features/hooks/useGitLabLabels";

type MultiSelectGitLabLabelsProps = {
  onChange: (event: string[]) => void;
};

export const MultiSelectGitLabLabels: React.FC<
  MultiSelectGitLabLabelsProps
> = ({ onChange }) => {
  const { groupLabels } = useGitLabLabels();
  const labels = useMemo(
    () =>
      groupLabels?.project?.labels.nodes?.map((label) => {
        return { label: label.title, value: label.title };
      }) ?? [],
    [groupLabels]
  );

  return (
    <CheckboxMenu
      id="gitlab-labels"
      label="Set GitLab labels"
      items={labels}
      onChange={onChange}
    />
  );
};
