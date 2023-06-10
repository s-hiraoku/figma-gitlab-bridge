import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
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
        <Typography variant="h3">
          🏖 404 Error: The requested page cannot be found.
        </Typography>
      </Box>
    </Box>
  );
}
