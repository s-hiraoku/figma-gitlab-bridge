import { useMemo } from "react";
import { useGraphQLClient } from "../useGraphQLClient";
import { GitLab } from "@types";
import { GET_ISSUES_QUERY, CREATE_ISSUE_MUTATION } from "./queries";
import { useGitLabSettings } from "@hooks/useGitLabSettings";

export const useGitLabIssues = () => {
  const { getGitLabAPIEndpoint, getGitLabAccessToken, getGitLabProjectPath } =
    useGitLabSettings();

  const gitLabAPIEndpoint = getGitLabAPIEndpoint();
  const gitLabAccessToken = getGitLabAccessToken();
  const gitLabProjectPath = getGitLabProjectPath();

  const defaultVariables = useMemo(() => {
    return { fullPath: gitLabProjectPath };
  }, [gitLabProjectPath]);

  const requestHeaders = useMemo(() => {
    return {
      authorization: `Bearer ${gitLabAccessToken}`,
    };
  }, [gitLabAccessToken]);

  const { data, error, isLoading, fetch, mutate } =
    useGraphQLClient<GitLab.IssueData>(
      gitLabAPIEndpoint ?? "",
      GET_ISSUES_QUERY,
      defaultVariables,
      requestHeaders
    );

  const getIssues = fetch;
  const createIssue = async (
    title: string,
    description: string,
    labels: string[]
  ) => {
    return mutate(CREATE_ISSUE_MUTATION, {
      projectPath: gitLabProjectPath,
      title,
      description,
      labels,
    });
  };

  return {
    data,
    error,
    isLoading,
    getIssues,
    createIssue,
  };
};
