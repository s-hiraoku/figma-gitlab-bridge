import { AppType } from "@types";
import {
  FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID,
  FigmaStickyToGitLabIssuesIconButton,
} from "./FigmaStickyToGitLabIssues";
import { HOME_APP_ID, HomeIconButton } from "./Home";

export const appList: AppType[] = [
  {
    id: HOME_APP_ID,
    icon: <HomeIconButton />,
  },
  {
    id: FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID,
    icon: <FigmaStickyToGitLabIssuesIconButton />,
  },
];
