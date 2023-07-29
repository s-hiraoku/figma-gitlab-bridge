import { DataTable, DataTableHeaderColumns } from "@components/DataTable";
import React, { useEffect } from "react";
import { GitLabIssues, convertStickyNoteToGitLabIssues } from "../utils";

export type ConfirmImportDataProps = {
  stickyNote: string;
  labels: string[];
  onChangeGitLabIssues: (gitLabIssues: GitLabIssues) => void;
};

const gitLabIssueHeaders: DataTableHeaderColumns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "labels", label: "Labels", minWidth: 170 },
  { id: "milestone", label: "Milestone", minWidth: 170 },
];

export const ConfirmImportData: React.FC<ConfirmImportDataProps> = ({
  stickyNote,
  labels,
  onChangeGitLabIssues,
}) => {
  const issues = convertStickyNoteToGitLabIssues(stickyNote, labels);
  useEffect(() => {
    const issues = convertStickyNoteToGitLabIssues(stickyNote, labels);
    onChangeGitLabIssues(issues);
  }, [stickyNote, labels, onChangeGitLabIssues]);
  return <DataTable headers={gitLabIssueHeaders} rows={issues} />;
};
