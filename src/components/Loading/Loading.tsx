import React from "react";
import { useTheme } from "@mui/material/styles";

export const Loading: React.FC = () => {
  const theme = useTheme();

  return (
    <div className="flex justify-center">
      <div
        style={{ backgroundColor: theme.palette.primary.main }}
        className="animate-ping h-2 w-2 rounded-full"
      ></div>
      <div
        style={{ backgroundColor: theme.palette.primary.main }}
        className="animate-ping h-2 w-2 rounded-full mx-4"
      ></div>
      <div
        style={{ backgroundColor: theme.palette.primary.main }}
        className="animate-ping h-2 w-2 rounded-full"
      ></div>
    </div>
  );
};
