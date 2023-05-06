import { SelectFigJamSticky } from "@features/SelectFigJamSticky";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export const FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID =
  "figma-sticky-to-gitlab-issues";

export const FigmaStickyToGitLabIssues: React.FC = () => {
  const handleChange = (color: string) => {
    console.log(color);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ m: 16 }}>
        <Typography variant="h2">FigJam Sticky To GitLab Issues</Typography>
      </Box>
      <TextField fullWidth label="Figma URL" variant="filled" />
      <Box sx={{ mt: 8, width: 200 }}>
        <SelectFigJamSticky onChange={handleChange} />
      </Box>
      <Button
        variant="outlined"
        startIcon={<FileDownloadOutlinedIcon />}
        sx={{ mt: 4 }}
      >
        Extraction of sticky notes
      </Button>
    </Box>
  );
};
