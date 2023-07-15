// GitLab の issues を取得して表示するサンプルコンポーネント

import React, { useCallback, useEffect } from "react";
import { useGitLabIssues } from "@hooks/useGitLabIssues";
import { Button } from "@mui/material";
import { GitLab } from "@types";

export const GitLabIssues = () => {
  const { data, getIssues, createIssue } = useGitLabIssues();

  const handleMutate = useCallback(() => {
    createIssue({
      title: "title test1",
      description: "title test1 description",
      labels: { nodes: [{ title: "青色ラベル" }] },
    });
  }, [createIssue]);

  useEffect(
    () => {
      getIssues();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <Button onClick={handleMutate}>Mutate Test</Button>
      {data &&
        data.project &&
        data.project.issues.nodes.map((issue: GitLab.Issue, index: number) => (
          <div key={index}>
            <h2>{issue.title}</h2>
            <p>{issue.description}</p>
            {issue.labels.nodes.map(
              (label: GitLab.Label, index: number) => (
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
