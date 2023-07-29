import { DataTable, DataTableHeaderColumns } from "@components/DataTable";
import React from "react";

export type ConfirmImportDataProps = {
  stickyNote: string;
};

const gitLabIssueHeaders: DataTableHeaderColumns = [
  { id: "title", label: "Title", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 170 },
  { id: "labels", label: "Labels", minWidth: 170 },
  { id: "milestone", label: "Milestone", minWidth: 170 },
];

export const ConfirmImportData: React.FC<ConfirmImportDataProps> = ({
  stickyNote,
}) => {
  const issues = [];
  return <DataTable headers={gitLabIssueHeaders} rows={issues} />;
};
