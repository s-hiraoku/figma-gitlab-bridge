// GitLab の issues を取得して表示するサンプルコンポーネント

import React, { useCallback, useEffect, useMemo } from "react";
import { useGitLabRequest } from "@hooks/useGitLabRequest";
import { useSettings } from "@hooks/useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { Button } from "@mui/material";

export const GitLabIssues = () => {
  const { data: settings } = useSettings();

  const gitLabAPIEndpoint = useMemo(() => {
    const adjustedSettings = settings ?? [];
    return findValueInSettingsByKey(
      adjustedSettings,
      SETTING_KEY.gitLabAPIEndpoint
    );
  }, [settings]);

  const gitLabAccessToken = useMemo(() => {
    const adjustedSettings = settings ?? [];
    return findValueInSettingsByKey(
      adjustedSettings,
      SETTING_KEY.gitLabAccessToken
    );
  }, [settings]);

  const gitLabProjectPath = useMemo(() => {
    const adjustedSettings = settings ?? [];
    return findValueInSettingsByKey(
      adjustedSettings,
      SETTING_KEY.gitLabProjectPath
    );
  }, [settings]);

  const { data, error, isLoading, getIssues, createIssue } = useGitLabRequest();

  const handleMutate = useCallback(() => {
    createIssue("title test1", "title test1 description", ["青色ラベル"]);
  }, [createIssue]);

  useEffect(() => {
    if (gitLabAPIEndpoint && gitLabAccessToken && gitLabProjectPath) {
      getIssues();
    }
  }, [gitLabAPIEndpoint, gitLabAccessToken, gitLabProjectPath, getIssues]);

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
