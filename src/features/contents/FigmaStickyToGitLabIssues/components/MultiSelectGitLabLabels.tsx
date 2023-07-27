import React, { useMemo } from "react";
import { CheckboxMenu } from "@components/CheckboxMenu";
import { useGitLabLabels } from "@hooks/useGitLabLabels";

type MultiSelectGitLabLabelsProps = {
  onChange: (event: string[]) => void;
};

export const MultiSelectGitLabLabels: React.FC<
  MultiSelectGitLabLabelsProps
> = ({ onChange }) => {
  const { data } = useGitLabLabels();
  const labels = useMemo(
    () =>
      data?.project?.labels.nodes?.map((label) => {
        return { label: label.title, value: label.title };
      }) ?? [],
    [data]
  );

  return (
    <CheckboxMenu
      id="gitlab-labels"
      label="GitLab labels"
      items={labels}
      onChange={onChange}
    />
  );
};
