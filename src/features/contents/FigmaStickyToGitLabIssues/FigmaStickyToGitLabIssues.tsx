import { Box, Button } from "@mui/material";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { LexicalEditorWrapper } from "@components/LexicalEditor";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FigmaPreview } from "@components/FigmaPreview";
import { parseFigmaId, stickyNotesToText } from "./utils";
import {
  ExtractStickyNotes,
  FigmaUrlTextField,
  Title,
  MultiSelectGitLabLabels,
} from "./components";

import { useFigJamStickyNotes } from "./hooks/useFigJamStickyNotes";
import { useFigJamResponseConverter } from "./hooks/useFigJamResponseConverter";
import {
  DEFAULT_FIGMA_STICKY_COLOR,
  FIGJAM_STATUS,
  FigJamColor,
  FigJamStatusType,
  Sections,
} from "./types";
import { useDebounce } from "@hooks/useDebounce";

import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import { FooterToolbarButtons } from "./components/FooterToolbarButtons";
import { BottomToolbar } from "@components/BottomToolbar";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { ErrorFallback } from "./components/ErrorFallback";
import { FadeLoader } from "react-spinners";
import { DataTable } from "@components/DataTable";

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
  const [bottomToolbarVisible, setBottomToolbarVisible] =
    useState<boolean>(false);
  const [stickyNote, setStickyNote] = useState<string>("");
  const {
    data: fileResponse,
    error: fileResponseError,
    isValidating,
    fetchStickyNotes,
  } = useFigJamStickyNotes();
  const { converter: convertFileResponseToStickyNotes, getSections } =
    useFigJamResponseConverter();
  const { debounce } = useDebounce();
  const theme = useTheme();

  const validateFigmaId = (value: string): boolean => {
    return parseFigmaId(value) !== null;
  };

  const updateStatusBasedOnValidation = (isValid: boolean): void => {
    setStatus(
      isValid ? FIGJAM_STATUS.extractStickyNotes : FIGJAM_STATUS.initialStage
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
      debounce(() => {
        if (checkFigmaIdAndSetFileSetupStatus(value)) {
          fetchStickyNotes(value);
        }
      });
    },
    [checkFigmaIdAndSetFileSetupStatus, debounce, fetchStickyNotes]
  );

  const handleFigmaUrlBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      checkFigmaIdAndSetFileSetupStatus(event.target.value);
    },
    [checkFigmaIdAndSetFileSetupStatus]
  );

  const handleFigmaUrlPaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = event.clipboardData.getData("Text");
      setFigmaUrl(pastedText);
      if (checkFigmaIdAndSetFileSetupStatus(pastedText)) {
        fetchStickyNotes(pastedText);
      }
    },
    [checkFigmaIdAndSetFileSetupStatus, fetchStickyNotes]
  );

  const handleExtractStickyNoteClick = useCallback(
    (selectStickyColor: FigJamColor, selectSections: Sections) => {
      setSelectSections(selectSections);
      setStickyColor(selectStickyColor);
      setStatus(FIGJAM_STATUS.editImportData);
    },
    []
  );

  const handleEditorChange = useCallback((text: string) => {
    setStickyNote(text);
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
    setSelectSections(undefined);
    setStickyNote("");
    setFigmaUrl("");
  }, []);

  useEffect(() => {
    if (status >= FIGJAM_STATUS.extractStickyNotes) {
      setBottomToolbarVisible(true);
      return;
    }
    setBottomToolbarVisible(false);
  }, [status]);

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
      setSections(undefined);
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

  const handleCreateGitLabIssueData = useCallback(() => {
    setStatus(FIGJAM_STATUS.confirmImportData);
  }, []);

  const handleClickRegisterGitLabIssues = useCallback(() => {
    console.log("hoge");
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
      <BottomToolbar visible={bottomToolbarVisible}>
        <FooterToolbarButtons
          onClickReset={handleReset}
          onClickRegisterGitLabIssues={handleClickRegisterGitLabIssues}
        />
      </BottomToolbar>
      {status >= FIGJAM_STATUS.initialStage &&
        status !== FIGJAM_STATUS.editImportData && (
          <Box sx={{ mt: 8, width: 800 }}>
            <Typography
              variant="h5"
              sx={{ ml: 1, color: theme.palette.primary.main }}
            >
              Setup Figma File
            </Typography>
            <Box sx={{ mt: 2 }}>
              <FigmaUrlTextField
                figmaUrl={figmaUrl}
                onChange={handleFigmaUrlChange}
                onBlur={handleFigmaUrlBlur}
                onPaste={handleFigmaUrlPaste}
                onError={handleFigmaUrlError}
              />
            </Box>
          </Box>
        )}
      {status >= FIGJAM_STATUS.extractStickyNotes && (
        <>
          <Box sx={{ mt: 8, width: 1200, height: 800 }}>
            <FigmaPreview url={figmaUrl} />
          </Box>
          <Box sx={{ mt: 8, width: 1200 }}>
            <Typography
              variant="h5"
              sx={{ ml: 1, color: theme.palette.primary.main }}
            >
              Extract Sticky Notes
            </Typography>
            <Box sx={{ mt: 8 }}>
              <ExtractStickyNotes
                sections={sections}
                onClickExtractStickyNote={handleExtractStickyNoteClick}
              />
            </Box>
          </Box>
        </>
      )}
      {status >= FIGJAM_STATUS.editImportData && (
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
                onChange={handleEditorChange}
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
                    <MultiSelectGitLabLabels
                      onChange={(event: string[]) => {
                        console.log(event);
                      }}
                    />
                  </Box>
                  <Box sx={{ width: 264 }}>TODO: Select Author</Box>
                </Suspense>
              </ErrorBoundary>
            </Box>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadOutlinedIcon />}
              sx={{ ml: 4 }}
              onClick={handleCreateGitLabIssueData}
            >
              Create GitLab issue Data for registration
            </Button>
          </Box>
        </>
      )}
      {status >= FIGJAM_STATUS.confirmImportData && (
        <Box sx={{ mt: 4 }}>
          <DataTable headers={[]} rows={[]} />
        </Box>
      )}
    </Box>
  );
};
