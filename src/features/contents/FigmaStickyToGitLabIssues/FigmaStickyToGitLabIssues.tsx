import { SelectFigJamSticky } from "@features/SelectFigJamSticky";
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { LexicalEditor } from "@components/LexicalEditor";
import FigmaIssuesIcon from "./FigmaIssuesIcon";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

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
        my: 16,
        width: "90%",
      }}
    >
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
          FigJam Sticky To GitLab Issues
        </Box>
      </Typography>
      <Box sx={{ mt: 16, width: 800 }}>
        <TextField fullWidth label="Figma URL" variant="filled" />
      </Box>
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
      <Box sx={{ mt: 8, width: "100%" }}>
        <LexicalEditor />
      </Box>
      <Button
        variant="outlined"
        startIcon={<PublishOutlinedIcon />}
        sx={{ mt: 4 }}
      >
        Regist to GitLab
      </Button>
    </Box>
  );
};
