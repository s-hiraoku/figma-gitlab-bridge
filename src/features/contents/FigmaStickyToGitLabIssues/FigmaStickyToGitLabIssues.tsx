import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { LexicalEditor } from "@components/LexicalEditor";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { FigmaPreview } from "@components/FigmaPreview";
import { parseFigmaId } from "./utils";
import { STATUS, StatusType } from "./models";
import { ExtractStickyNotes, FigmaUrlTextField, Title } from "./components";
import { useFigJamStickyNotes } from "./hooks/useFigJamStickyNotes";

export const FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID =
  "figma-sticky-to-gitlab-issues";

export const FigmaStickyToGitLabIssues: React.FC = () => {
  const [figmaUrl, setFigmaUrl] = useState<string>("");
  const [status, setStatus] = useState<StatusType>(STATUS.initialStage);
  const {
    data: stickyNotes,
    error,
    isValidating,
    fetchStickyNotes,
  } = useFigJamStickyNotes(figmaUrl);

  const checkFigmaIdAndSetStatus = (value: string) => {
    if (value === "") {
      setStatus(STATUS.initialStage);
      return;
    }
    if (parseFigmaId(value)) {
      setStatus(STATUS.fileSetupCompleted);
    }
  };

  const handleFigmaUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFigmaUrl(value);
    checkFigmaIdAndSetStatus(value);
  };

  const handleFigmaUrlBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    checkFigmaIdAndSetStatus(event.target.value);
  };

  const handleFigmaUrlPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pastedText = event.clipboardData.getData("Text");
    checkFigmaIdAndSetStatus(pastedText);
  };

  const handleExtractStickyNoteClick = () => {
    // TODO: error handling
    fetchStickyNotes();
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
      <Title title="FigJam Sticky To GitLab Issues" />
      {status >= STATUS.initialStage && (
        <Box sx={{ mt: 8, width: 800 }}>
          <FigmaUrlTextField
            figmaUrl={figmaUrl}
            onChange={handleFigmaUrlChange}
            onBlur={handleFigmaUrlBlur}
            onPaste={handleFigmaUrlPaste}
          />
        </Box>
      )}
      {status >= STATUS.fileSetupCompleted && (
        <>
          <Box sx={{ mt: 8, width: 1200, height: 800 }}>
            <FigmaPreview url={figmaUrl} />
          </Box>

          <Box sx={{ mt: 8 }}>
            <ExtractStickyNotes
              onExtractStickyNoteClick={handleExtractStickyNoteClick}
            />
          </Box>
        </>
      )}
      {status >= STATUS.extractStickyNote && (
        <>
          <Box sx={{ mt: 8, width: 1200 }}>
            <LexicalEditor />
          </Box>
          <Button
            variant="outlined"
            startIcon={<PublishOutlinedIcon />}
            sx={{ mt: 4 }}
          >
            Resist to GitLab
          </Button>
        </>
      )}
    </Box>
  );
};
