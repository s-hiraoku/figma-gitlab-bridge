// GitLab の issues を取得して表示するサンプルコンポーネント

import React, { useEffect, useMemo } from "react";
import { useGraphQLClient } from "@hooks/useGraphQLClient";
import { useSettings } from "@hooks/useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";

const GET_PROJECT_ISSUES = `
  query GetProjectIssues($fullPath: ID!) {
    project(fullPath: $fullPath) {
      issues {
        nodes {
          title
          description
          labels {
            nodes {
              title
            }
          }
          createdAt
        }
      }
    }
  }
`;

// Define the type for the issue
type Issue = {
  title: string;
  description: string;
  labels: any;
  createdAt: string;
};

// Define the type for the project
type Project = {
  issues: {
    nodes: Issue[];
  };
};

// Define the type for the data
type Data = {
  project: Project;
};

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

  console.log("gitLabProjectPath", gitLabProjectPath);

  const { data, error, isLoading, refetch } = useGraphQLClient<Data>(
    gitLabAPIEndpoint ?? "", // GraphQL API endpoint
    GET_PROJECT_ISSUES, // Default query
    { fullPath: gitLabProjectPath },
    gitLabAccessToken ?? "" // Personal access token
  );
  useEffect(() => {
    refetch(GET_PROJECT_ISSUES);
  }, [gitLabProjectPath]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={() => refetch(GET_PROJECT_ISSUES)}>
        Refetch Issues
      </button>
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
