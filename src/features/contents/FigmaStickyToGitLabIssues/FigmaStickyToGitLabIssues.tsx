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

export const FIGMA_STICKY_TO_GIT_LAB_ISSUES_APP_ID =
  "figma-sticky-to-gitlab-issues";

export const FigmaStickyToGitLabIssues: React.FC = () => {
  const [figmaUrl, setFigmaUrl] = useState<string>("");
  const [stickyColor, setStickyColor] = React.useState<FigJamColor>(
    DEFAULT_FIGMA_STICKY_COLOR
  );
  const [sections, setSections] = useState<string[] | undefined>(undefined);
  const [selectSections, setSelectSections] = useState<string[] | undefined>(
    undefined
  );
  const [status, setStatus] = useState<FigJamStatusType>(
    FIGJAM_STATUS.initialStage
  );
  const [stickyNote, setStickyNote] = useState<string>("");
  const {
    data: fileResponse,
    error: fileResponseError,
    isValidating,
    fetchStickyNotes,
  } = useFigJamStickyNotes(figmaUrl);
  const { converter: convertFileResponseToStickyNotes, getSections } =
    useFigJamResponseConverter();
  const { debounce } = useDebounce();
  const theme = useTheme();

  const validateFigmaId = (value: string): boolean => {
    return parseFigmaId(value) !== null;
  };

  const updateStatusBasedOnValidation = (isValid: boolean): void => {
    setStatus(
      isValid ? FIGJAM_STATUS.fileSetupCompleted : FIGJAM_STATUS.initialStage
    );
  };

  const checkFigmaIdAndSetFileSetupStatus = useCallback(
    (value: string): boolean => {
      const isValid = validateFigmaId(value);
      updateStatusBasedOnValidation(isValid);
      return isValid;
    },
    []
  );

  const handleFigmaUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setFigmaUrl(value);
      debounce(() => checkFigmaIdAndSetFileSetupStatus(value));
    },
    [checkFigmaIdAndSetFileSetupStatus, debounce]
  );

  const handleFigmaUrlBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (checkFigmaIdAndSetFileSetupStatus(event.target.value)) {
        fetchStickyNotes();
      }
    },
    [checkFigmaIdAndSetFileSetupStatus, fetchStickyNotes]
  );

  const handleFigmaUrlPaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData.getData("Text");
      if (checkFigmaIdAndSetFileSetupStatus(pastedText)) {
        fetchStickyNotes();
      }
    },
    [checkFigmaIdAndSetFileSetupStatus, fetchStickyNotes]
  );

  const handleExtractStickyNoteClick = useCallback(() => {
    fetchStickyNotes().then(() => {
      setStatus(FIGJAM_STATUS.extractStickyNote);
    });
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

  const handleChangeSelectSections = useCallback((sections: string[]) => {
    setSelectSections(sections);
    setStickyNote("");
  }, []);

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
    if (!fileResponseError && !isValidating && fileResponse) {
      const stickyNotes = convertFileResponseToStickyNotes(
        figmaUrl,
        stickyColor,
        fileResponse,
        selectSections
      );

      setSections(getSections(fileResponse));
      setStickyNote(stickyNotesToText(stickyNotes));
    }
    return () => {
      setStickyNote("");
    };
  }, [
    convertFileResponseToStickyNotes,
    fileResponseError,
    figmaUrl,
    fileResponse,
    getSections,
    isValidating,
    sections,
    selectSections,
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
                sections={sections}
                onChangeSelectSections={handleChangeSelectSections}
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
