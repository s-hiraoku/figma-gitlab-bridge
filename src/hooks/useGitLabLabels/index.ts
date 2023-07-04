import { useMemo } from "react";
import { useGraphQLClient } from "../useGraphQLClient";
import { GitLab } from "@types";
import { GET_LABELS_QUERY } from "./queries";
import { useGitLabSettings } from "@hooks/useGitLabSettings";

export const useGitLabLabels = () => {
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

  const { data, error, isLoading, fetch } = useGraphQLClient<GitLab.LabelData>(
    gitLabAPIEndpoint ?? "",
    GET_LABELS_QUERY,
    defaultVariables,
    requestHeaders
  );

  const getLabels = fetch;

  return {
    data,
    error,
    isLoading,
    getLabels,
  };
};
