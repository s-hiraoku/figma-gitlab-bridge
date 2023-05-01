import React from "react";
import { IconButtonWithTooltip } from "@components/IconButtonWithTooltip";
import { useRouter } from "next/router";
import FigmaIssuesIcon from "./FigmaIssuesIcon";

export const iconId = "figma-sticky-to-gitlab-issues";

export const FigmaStickyToGitLabIssuesIconButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/figma-sticky-to-gitlab-issues");
  };

  return (
    <IconButtonWithTooltip
      icon={<FigmaIssuesIcon />}
      tooltipText="FigJam Sticky To GitLab Issues"
      tooltipPlacement="right"
      key="figjam-sticky-to-gitlab-issues"
      onClick={handleClick}
    />
  );
};
