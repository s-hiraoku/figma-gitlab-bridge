import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FigmaPreview } from "@components/FigmaPreview";
import {
  GitLabIssues,
  convertStickyNotesToGitLabIssues,
  parseFigmaId,
  stickyNotesToText,
  validateGitLabIssues,
} from "./utils";
import { ExtractStickyNotes, FigmaUrlTextField, Title } from "./components";
import { useFigJamStickyNotes } from "../../hooks/useFigJamStickyNotes";
import { useFigJamResponseConverter } from "../../hooks/useFigJamResponseConverter";
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
import { EditIssuesDataForImport } from "./components/EditIssuesDataForImport";
import { ConfirmImportData } from "./components/ConfirmImportData";
import { useGitLabIssues } from "@features/hooks/useGitLabIssues";
import { toast } from "react-toastify";

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

  const [validationError, setValidationError] = useState<boolean>(false);

  const { createIssue } = useGitLabIssues();

  const [gitLabIssues, setGitLabIssues] = useState<GitLabIssues>([]);
  const [shouldUpdateEditor, setShouldUpdateEditor] = useState<boolean>(false);
  const [shouldAddPrefix, setShouldAddPrefix] = useState<boolean>(false);

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

  const handleExtractStickyNoteClick = useCallback(
    (
      selectStickyColor: FigJamColor,
      selectSections: Sections,
      shouldAddPrefix: boolean
    ) => {
      setShouldUpdateEditor(true);
      setSelectSections(selectSections);
      setStickyColor(selectStickyColor);
      setShouldAddPrefix(shouldAddPrefix);
      setStatus(FIGJAM_STATUS.editImportData);
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
    setSelectSections(undefined);
    setStickyNote("");
    setFigmaUrl("");
    setValidationError(false);
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
      setStickyNote(stickyNotesToText(stickyNotes, shouldAddPrefix));
    }
    return () => {
      setStickyNote("");
      setSections(undefined);
    };
  }, [
    convertFileResponseToStickyNotes,
    figmaUrl,
    fileResponse,
    fileResponseError,
    getSections,
    isValidating,
    selectSections,
    stickyColor,
    shouldAddPrefix,
  ]);

  const handleCreateGitLabIssueData = useCallback((stickyNote: string) => {
    setStickyNote(stickyNote);
    setStatus(FIGJAM_STATUS.confirmImportData);
  }, []);

  const handleChangeGitLabIssues = useCallback(
    (gitLabIssues: GitLabIssues) => {
      setGitLabIssues(gitLabIssues);
    },
    [setGitLabIssues]
  );

  const handleClickRegisterGitLabIssues = useCallback(async () => {
    let hasError = false;

    setValidationError(false);

    const isValid = validateGitLabIssues(gitLabIssues);
    if (!isValid) {
      setValidationError(true);
      return;
    }

    for (const issue of gitLabIssues) {
      const convertedIssue = convertStickyNotesToGitLabIssues(issue);
      try {
        await createIssue(convertedIssue);
      } catch (error) {
        hasError = true;
      }
    }

    if (hasError) {
      toast.error("Failed to register GitLab issues.");
      return;
    }
    toast.success("GitLab issues successfully registered!");
  }, [createIssue, gitLabIssues]);

  const handleCompleteUpdateEditor = useCallback(() => {
    setShouldUpdateEditor(false);
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
        paddingBottom: 8,
        overflow: "auto",
      }}
    >
      <Title title="FigJam Sticky To GitLab Issues" />
      <BottomToolbar visible={bottomToolbarVisible}>
        <FooterToolbarButtons
          registerButtonDisabled={status !== FIGJAM_STATUS.confirmImportData}
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
        <EditIssuesDataForImport
          initialStickyNote={stickyNote}
          shouldUpdateEditor={shouldUpdateEditor}
          onClickCreateGitLabIssueData={handleCreateGitLabIssueData}
          onCompleteUpdateEditor={handleCompleteUpdateEditor}
        />
      )}
      {status >= FIGJAM_STATUS.confirmImportData && (
        <Box sx={{ mt: 8, width: 1200 }}>
          <Typography
            variant="h5"
            sx={{ ml: 1, color: theme.palette.primary.main }}
          >
            GitLab issues to register
          </Typography>
          <Box sx={{ mt: 4 }}>
            <ConfirmImportData
              validationError={validationError}
              stickyNote={stickyNote}
              onChangeGitLabIssues={handleChangeGitLabIssues}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
