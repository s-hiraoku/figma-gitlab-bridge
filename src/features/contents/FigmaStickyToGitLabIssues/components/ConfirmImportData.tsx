import { DataTable, DataTableHeaderColumns } from "@components/DataTable";
import React, { Suspense, useEffect } from "react";
import { GitLabIssues, convertStickyNoteToGitLabIssues } from "../utils";
import { Box, useTheme } from "@mui/system";
import { ErrorBoundary } from "@suspensive/react";
import { ErrorFallback } from "./ErrorFallback";
import { FadeLoader } from "react-spinners";
import { MultiSelectGitLabLabels } from "./MultiSelectGitLabLabels";
import { Alert, Card, Typography } from "@mui/material";

export type ConfirmImportDataProps = {
  validationError: boolean;
  stickyNote: string;
  labels: string[];
  onChangeGitLabIssues: (gitLabIssues: GitLabIssues) => void;
  onChangeLabels: (labels: string[]) => void;
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
  labels,
  onChangeGitLabIssues,
  onChangeLabels,
}) => {
  const theme = useTheme();
  const [issues, setIssues] = React.useState<GitLabIssues>([]);
  useEffect(() => {
    const issues = convertStickyNoteToGitLabIssues(stickyNote, labels);
    setIssues(issues);
    onChangeGitLabIssues(issues);
  }, [stickyNote, labels, onChangeGitLabIssues]);
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
                <MultiSelectGitLabLabels onChange={onChangeLabels} />
              </Box>
            </Suspense>
          </ErrorBoundary>
        </Box>
      </Card>
      <Box sx={{ mt: 2 }}>
        <DataTable
          ariaLabel="Gitlab issues to be imported"
          headers={gitLabIssueHeaders}
          rows={issues}
          defaultRowsPerPage={25}
        />
        {validationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            There is data for which no title has been set. Please set a title.
          </Alert>
        )}
      </Box>
    </>
  );
};
