import React from "react";
import { FigmaStickyToGitLabIssues } from "./contents/FigmaStickyToGitLabIssues";

type Props = {
  appId: string;
};

export const App: React.FC<Props> = ({ appId }) => {
  if (appId === "figma-sticky-to-gitlab-issues") {
    return <FigmaStickyToGitLabIssues />;
  }
  return <FigmaStickyToGitLabIssues />;
};
