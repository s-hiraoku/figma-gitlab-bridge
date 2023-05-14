import React, { useContext } from "react";
import { IconButtonWithTooltip } from "@components/IconButtonWithTooltip";
import FigmaIssuesIcon from "./FigmaIssuesIcon";
import { AppContext } from "@stores/context/AppContext/AppContext";
import { FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID } from "./FigmaStickyToGitLabIssues";
import { useRouter } from "next/router";

export const FigmaStickyToGitLabIssuesIconButton: React.FC = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppRegister must be used within a AppProvider");
  }
  const { setSelectedAppId } = context;
  const handleClick = () => {
    router.push("/figjamStickyToGitlabIssues");
    setSelectedAppId(FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID);
  };

  return (
    <IconButtonWithTooltip
      icon={<FigmaIssuesIcon currentColor />}
      tooltipText="FigJam Sticky To GitLab Issues"
      tooltipPlacement="right"
      key="figjam-sticky-to-gitlab-issues"
      onClick={handleClick}
      selected={context.selectedAppId === FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID}
    />
  );
};
