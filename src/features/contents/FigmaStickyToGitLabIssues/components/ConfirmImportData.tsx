import { DataTable, DataTableHeaderColumns } from "@components/DataTable";
import React, { Suspense, useCallback, useEffect } from "react";
import {
  GitLabIssue,
  GitLabIssues,
  convertStickyNoteToGitLabIssues,
} from "../utils";
import { Box, useTheme } from "@mui/system";
import { ErrorBoundary } from "@suspensive/react";
import { ErrorFallback } from "./ErrorFallback";
import { FadeLoader } from "react-spinners";
import { MultiSelectGitLabLabels } from "./MultiSelectGitLabLabels";
import { Alert, Card, Typography } from "@mui/material";
import { EditIssueModal } from "./EditIssueModal";

export type ConfirmImportDataProps = {
  validationError: boolean;
  stickyNote: string;
  onChangeGitLabIssues: (gitLabIssues: GitLabIssues) => void;
};

const gitLabIssueHeaders: DataTableHeaderColumns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "labels", label: "Labels", minWidth: 170 },
  { id: "milestone", label: "Milestone", minWidth: 170 },
];

export const ConfirmImportData: React.FC<ConfirmImportDataProps> = ({
  validationError,
  stickyNote,
  onChangeGitLabIssues,
}) => {
  const theme = useTheme();
  const [issues, setIssues] = React.useState<GitLabIssues>([]);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  useEffect(() => {
    const issues = convertStickyNoteToGitLabIssues(stickyNote, []);
    setIssues(issues);
    onChangeGitLabIssues(issues);
    return () => {
      setIssues([]);
      setEditingIndex(null);
    };
  }, [stickyNote, onChangeGitLabIssues]);

  const handleClickTableRow = useCallback((index: number) => {
    setEditingIndex(index);
  }, []);

  const handleEditModalClose = useCallback(() => {
    setEditingIndex(null);
  }, []);

  const handleChangeIssue = useCallback(
    (issue: GitLabIssue) => {
      const newIssues = [...issues];
      if (editingIndex == null) {
        return;
      }
      newIssues[editingIndex] = issue;
      setIssues(newIssues);
      onChangeGitLabIssues(newIssues);
    },
    [issues, editingIndex, onChangeGitLabIssues]
  );

  const handleChangeLabels = useCallback(
    (labels: string[]) => {
      const newIssues = convertStickyNoteToGitLabIssues(stickyNote, labels);
      setIssues(newIssues);
      onChangeGitLabIssues(newIssues);
    },
    [stickyNote, onChangeGitLabIssues]
  );

  return (
    <>
      <Card sx={{ mt: 2, py: 2, width: 1200 }}>
        <Typography variant="caption" color="secondary" sx={{ ml: 1 }}>
          Edit Label of issues data for import
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            mt: 1,
            ml: 2,
          }}
        >
          <ErrorBoundary fallback={<ErrorFallback />}>
            <Suspense
              fallback={<FadeLoader color={theme.palette.primary.main} />}
            >
              <Box sx={{ width: 264 }}>
                <MultiSelectGitLabLabels onChange={handleChangeLabels} />
              </Box>
            </Suspense>
          </ErrorBoundary>
        </Box>
      </Card>
      <Typography variant="body1" color="secondary" sx={{ ml: 2, mt: 1 }}>
        Click on a row in the table to edit it.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <DataTable
          ariaLabel="Gitlab issues to be imported"
          headers={gitLabIssueHeaders}
          rows={issues}
          defaultRowsPerPage={25}
          onClickTableRow={handleClickTableRow}
        />
        {validationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            There is data for which no title has been set. Please set a title.
          </Alert>
        )}
      </Box>
      {issues.length > 0 && (
        <EditIssueModal
          open={editingIndex != null}
          issue={issues[editingIndex ?? 0]}
          onChangeIssue={handleChangeIssue}
          onClose={handleEditModalClose}
        />
      )}
    </>
  );
};
