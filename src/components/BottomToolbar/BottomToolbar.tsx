import React, { useMemo } from "react";
import { Box, Toolbar, AppBar } from "@mui/material";
import { SIDEBAR_WIDTH } from "@components/IconSidebar/IconSidebar";
import styles from "./BottomToolbar.module.css";

export type ChildrenPosition = "left" | "center" | "right";
export const CHILDREN_POSITION = {
  left: "left",
  center: "center",
  right: "right",
} as const satisfies Record<ChildrenPosition, ChildrenPosition>;

export type BottomToolbarProps = {
  visible?: boolean;
  children: React.ReactNode;
  childrenPosition?: ChildrenPosition;
};

const convertChildrenPositionToJustifyContent = (
  childrenPosition: ChildrenPosition
): React.CSSProperties["justifyContent"] => {
  switch (childrenPosition) {
    case CHILDREN_POSITION.left:
      return "flex-start";
    case CHILDREN_POSITION.center:
      return "center";
    case CHILDREN_POSITION.right:
      return "flex-end";
  }
};

export const BottomToolbar: React.FC<BottomToolbarProps> = ({
  visible = true,
  children,
  childrenPosition = CHILDREN_POSITION.right,
}) => {
  const justifyContent = useMemo(
    () => convertChildrenPositionToJustifyContent(childrenPosition),
    [childrenPosition]
  );

  return (
    <AppBar
      position="fixed"
      className={styles.bottomToolbar}
      sx={{
        top: "auto",
        left: SIDEBAR_WIDTH,
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        bottom: visible ? 0 : -56,
        display: "block",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent,
        }}
      >
        <Box sx={{ mx: 2 }}>{children}</Box>
      </Toolbar>
    </AppBar>
  );
};
