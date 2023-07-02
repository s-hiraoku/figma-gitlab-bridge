import { Box, Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { LexicalEditorWrapper } from "@components/LexicalEditor";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";
import { FigmaPreview } from "@components/FigmaPreview";
import { parseFigmaId, stickyNotesToText } from "./utils";
import { ExtractStickyNotes, FigmaUrlTextField, Title } from "./components";
import { useFigJamStickyNotes } from "./hooks/useFigJamStickyNotes";
import { useFigJamResponseConverter } from "./hooks/useFigJamResponseConverter";
import {
  DEFAULT_FIGMA_STICKY_COLOR,
  FIGJAM_STATUS,
  FigJamColor,
  FigJamStatusType,
} from "./types";
import { useDebounce } from "@hooks/useDebounce";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import { GitLabIssues } from "./components/sample/GitLabIssues";

export const FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID =
  "figma-sticky-to-gitlab-issues";

export const FigmaStickyToGitLabIssues: React.FC = () => {
  const [figmaUrl, setFigmaUrl] = useState<string>("");
  const [stickyColor, setStickyColor] = React.useState<FigJamColor>(
    DEFAULT_FIGMA_STICKY_COLOR
  );
  const [status, setStatus] = useState<FigJamStatusType>(
    FIGJAM_STATUS.initialStage
  );
  const [stickyNote, setStickyNote] = useState<string>("");
  const {
    data: fileResponse,
    error,
    isValidating,
    fetchStickyNotes,
  } = useFigJamStickyNotes(figmaUrl);
  const { converter: convertFileResponseToStickyNotes } =
    useFigJamResponseConverter();
  const { debounce } = useDebounce();
  const theme = useTheme();

  const checkFigmaIdAndSetStatus = useCallback((value: string) => {
    if (value === "") {
      setStatus(FIGJAM_STATUS.initialStage);
      return;
    }
    if (parseFigmaId(value)) {
      setStatus(FIGJAM_STATUS.fileSetupCompleted);
      return;
    }
    setStatus(FIGJAM_STATUS.initialStage);
  }, []);

  const handleFigmaUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFigmaUrl(value);
      debounce(() => checkFigmaIdAndSetStatus(value));
    },
    [checkFigmaIdAndSetStatus, debounce]
  );

  const handleFigmaUrlBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      checkFigmaIdAndSetStatus(event.target.value);
    },
    [checkFigmaIdAndSetStatus]
  );

  const handleFigmaUrlPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pastedText = event.clipboardData.getData("Text");
    checkFigmaIdAndSetStatus(pastedText);
  };

  const handleExtractStickyNoteClick = useCallback(() => {
    fetchStickyNotes();
  }, [fetchStickyNotes]);

  const handleEditorChange = useCallback((text: string) => {
    setStickyNote(text);
  }, []);

  const handleChangeSelectStickyColor = useCallback(
    (stickyColor: FigJamColor) => {
      setStickyColor(stickyColor);
      setStickyNote("");
    },
    []
  );

  const handleFigmaUrlError = useCallback(
    (error: boolean) => {
      if (error) {
        debounce(() => setStatus(FIGJAM_STATUS.initialStage));
      }
    },
    [debounce]
  );

  const handleReset = useCallback(() => {
    setStatus(FIGJAM_STATUS.initialStage);
  }, []);

  useEffect(() => {
    if (!error && !isValidating && fileResponse) {
      setStatus(FIGJAM_STATUS.extractStickyNote);

      const stickyNotes = convertFileResponseToStickyNotes(
        figmaUrl,
        stickyColor,
        fileResponse
      );
      setStickyNote(stickyNotesToText(stickyNotes));
    }
    return () => {
      setStickyNote("");
    };
  }, [
    convertFileResponseToStickyNotes,
    error,
    figmaUrl,
    fileResponse,
    isValidating,
    setStickyColor,
    stickyColor,
  ]);

  const handleRegisterIssuesWithGitLab = useCallback(() => {
    setStatus(FIGJAM_STATUS.registerWithIssuesGitLab);
  }, []);

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
      <GitLabIssues />
      {status >= FIGJAM_STATUS.initialStage &&
        status !== FIGJAM_STATUS.extractStickyNote && (
          <Box sx={{ mt: 8, width: 800 }}>
            <FigmaUrlTextField
              figmaUrl={figmaUrl}
              onChange={handleFigmaUrlChange}
              onBlur={handleFigmaUrlBlur}
              onPaste={handleFigmaUrlPaste}
              onError={handleFigmaUrlError}
            />
          </Box>
        )}
      {status >= FIGJAM_STATUS.fileSetupCompleted && (
        <>
          <Box sx={{ mt: 8, width: 1200, height: 800 }}>
            <FigmaPreview url={figmaUrl} />
          </Box>

          {status !== FIGJAM_STATUS.extractStickyNote && (
            <Box sx={{ mt: 8 }}>
              <ExtractStickyNotes
                onChangeSelectStickyColor={handleChangeSelectStickyColor}
                onClickExtractStickyNote={handleExtractStickyNoteClick}
              />
            </Box>
          )}
        </>
      )}
      {status >= FIGJAM_STATUS.extractStickyNote && (
        <>
          <Box sx={{ mt: 8, width: 1200 }}>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ ml: 1, color: theme.palette.primary.main }}
            >
              Edit Issues Data for Import
            </Typography>
            <Box sx={{ mt: 1 }}>
              <LexicalEditorWrapper
                initialText={stickyNote}
                onChange={handleEditorChange}
              />
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
              color="warning"
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              startIcon={<PublishOutlinedIcon />}
              sx={{ ml: 4 }}
              onClick={handleRegisterIssuesWithGitLab}
            >
              Registering issues with GitLab
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
