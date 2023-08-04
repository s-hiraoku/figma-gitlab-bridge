import { LexicalEditorWrapper } from "@components/LexicalEditor";
import { Button, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { ErrorBoundary, Suspense } from "@suspensive/react";
import { ErrorFallback } from "./ErrorFallback";
import { FadeLoader } from "react-spinners";
import React, { useCallback, useState, useEffect } from "react";
import { MultiSelectGitLabLabels } from "./MultiSelectGitLabLabels";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export type EditIssuesDataForImportProps = {
  initialStickyNote: string;
  onClickCreateGitLabIssueData: (stickyNote: string) => void;
  onChangeLabels: (labels: string[]) => void;
};

export const EditIssuesDataForImport: React.FC<
  EditIssuesDataForImportProps
> = ({ initialStickyNote, onClickCreateGitLabIssueData, onChangeLabels }) => {
  const theme = useTheme();
  const [stickyNote, setStickyNote] = useState<string>(initialStickyNote);

  useEffect(() => {
    setStickyNote(initialStickyNote);
  }, [initialStickyNote]);

  const handleEditorBlur = useCallback((text: string) => {
    setStickyNote(text);
  }, []);

  const handleClickCreateGitLabIssueData = useCallback(() => {
    onClickCreateGitLabIssueData(stickyNote);
  }, [onClickCreateGitLabIssueData, stickyNote]);

  return (
    <>
      <Box sx={{ mt: 8, width: 1200 }}>
        <Typography
          variant="h5"
          sx={{ ml: 1, color: theme.palette.primary.main }}
        >
          Edit Issues Data for Import
        </Typography>
        <Typography variant="body1" color="secondary" sx={{ ml: 2, mt: 1 }}>
          The left side is the title and the right side is the description.
        </Typography>
        <Box sx={{ mt: 1 }}>
          <LexicalEditorWrapper
            initialText={stickyNote}
            onBlur={handleEditorBlur}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2, width: 1200 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            gap: "40px",
          }}
        >
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense
              fallback={<FadeLoader color={theme.palette.primary.main} />}
            >
              <Box sx={{ width: 264 }}>
                <MultiSelectGitLabLabels onChange={onChangeLabels} />
              </Box>
            </Suspense>
          </ErrorBoundary>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<FileDownloadOutlinedIcon />}
          sx={{ ml: 4 }}
          onClick={handleClickCreateGitLabIssueData}
        >
          Create GitLab issue Data for registration
        </Button>
      </Box>
    </>
  );
};
