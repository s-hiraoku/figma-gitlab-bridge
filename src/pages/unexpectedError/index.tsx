import { Box, Typography } from "@mui/material";
import React from "react";

export default function UnexpectedError() {
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
          ⚠️ Unexpected Error: Something went wrong. Please try again later.
        </Typography>
      </Box>
    </Box>
  );
}
