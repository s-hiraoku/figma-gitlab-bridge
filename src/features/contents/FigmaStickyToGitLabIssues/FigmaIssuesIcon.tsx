import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const FigmaIssuesIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 48 48">
      <rect
        x="5"
        y="5"
        width="18"
        height="18"
        rx="2"
        ry="2"
        fill="currentColor"
      />
      <rect
        x="25"
        y="5"
        width="18"
        height="18"
        rx="2"
        ry="2"
        fill="currentColor"
      />
      <rect
        x="5"
        y="25"
        width="18"
        height="18"
        rx="2"
        ry="2"
        fill="currentColor"
      />
      <rect
        x="25"
        y="25"
        width="18"
        height="18"
        rx="2"
        ry="2"
        fill="currentColor"
      />
      <path d="M21 43V33H27V43H21Z" fill="currentColor" />
      <circle cx="24" cy="28" r="2" fill="currentColor" />
    </SvgIcon>
  );
};

export default FigmaIssuesIcon;
