import { Box, Typography } from "@mui/material";
import React from "react";
import FigmaIssuesIcon from "../FigmaIssuesIcon";
type Props = {
  title: string;
};
export const Title: React.FC<Props> = ({ title }) => {
  return (
    <Typography variant="h2">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"span"}
          sx={{
            width: "72px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FigmaIssuesIcon sx={{ fontSize: "48px" }} />
        </Box>
        {title}
      </Box>
    </Typography>
  );
};
