import React from "react";
import { IconButtonWithTooltip } from "@components/IconButtonWithTooltip";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useRouter } from "next/router";

export const iconId = "figma-sticky-to-gitlab-issues";

export const FigmaStickyToGitLabIssuesIconButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/figma-sticky-to-gitlab-issues");
  };

  return (
    <IconButtonWithTooltip
      icon={<FileDownloadOutlinedIcon />}
      tooltipText="FigJam Sticky To GitLab Issues"
      key="figjam-sticky-to-gitlab-issues"
      onClick={handleClick}
    />
  );
};
