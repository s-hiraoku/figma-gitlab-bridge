import { IconSidebar } from "@components/IconSidebar";
import React, { useEffect, useRef } from "react";
import { useAppRegister } from "@hooks/useAppRegister";
import {
  FigmaStickyToGitLabIssuesIconButton,
  iconId as figmaStickyToGitLabIssuesIconId,
} from "@features/contents/FigmaStickyToGitLabIssues/FigmaStickyToGitLabIssuesIconButton";

export const IconSidebarContainer: React.FC = () => {
  const { icons, registerIcon } = useAppRegister();
  const isRegistered = useRef(false);

  useEffect(() => {
    if (
      !icons.some((icon) => icon.id === figmaStickyToGitLabIssuesIconId) &&
      !isRegistered.current
    ) {
      registerIcon({
        id: figmaStickyToGitLabIssuesIconId,
        icon: <FigmaStickyToGitLabIssuesIconButton />,
      });
      isRegistered.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerIcon]);

  return <IconSidebar icons={icons.map((icon) => icon.icon)} />;
};
