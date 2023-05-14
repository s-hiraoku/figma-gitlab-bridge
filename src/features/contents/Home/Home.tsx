export const HOME_APP_ID = "home";

import { Box, Typography } from "@mui/material";
import React from "react";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box>
        <Typography variant="h2">🚀 Figma GitLab Bridge</Typography>
      </Box>
    </Box>
  );
};
