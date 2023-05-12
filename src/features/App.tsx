import React from "react";
import {
  FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID,
  FigmaStickyToGitLabIssues,
} from "./contents/FigmaStickyToGitLabIssues";
import { HOME_APP_ID, Home } from "./contents/Home";

type Props = {
  appId: string;
};

export const App: React.FC<Props> = ({ appId }) => {
  switch (appId) {
    case HOME_APP_ID:
      return <Home />;
    case FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID:
      return <FigmaStickyToGitLabIssues />;
    default:
      return <Home />;
  }
};
