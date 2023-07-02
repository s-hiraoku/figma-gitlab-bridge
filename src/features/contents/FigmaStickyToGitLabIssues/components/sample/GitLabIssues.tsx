// GitLab の issues を取得して表示するサンプルコンポーネント

import React, { useCallback, useEffect } from "react";
import { useGitLabIssues } from "@hooks/useGitLabIssues";
import { Button } from "@mui/material";

export const GitLabIssues = () => {
  const { data, error, isLoading, getIssues, createIssue } = useGitLabIssues();

  const handleMutate = useCallback(() => {
    createIssue("title test1", "title test1 description", ["青色ラベル"]);
  }, [createIssue]);

  useEffect(
    () => {
      getIssues();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Button onClick={handleMutate}>Mutate Test</Button>
      {data &&
        data.project &&
        data.project.issues.nodes.map((issue: any, index: any) => (
          <div key={index}>
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            {issue.labels.nodes.map(
              (label: any, index: any) => (
                <p key={index}>{label.title}</p>
              ),
              []
            )}
            <p>Created at: {issue.createdAt}</p>
          </div>
        ))}
    </div>
  );
};
