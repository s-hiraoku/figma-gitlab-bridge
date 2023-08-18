import { useMemo } from "react";
import { GitLab } from "@types";
import { gitLabLabelsQueries, gitLabGroupLabelsQueries } from "./queries";
import { useGitLabSettings } from "@features/hooks/useGitLabSettings";
import { useGraphQLApiClient } from "@hooks/useGraphQLApiClient";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGitLabLabels = () => {
  const { getGitLabApiEndpoint, getGitLabAccessToken, getGitLabProjectPath } =
    useGitLabSettings();

  const gitLabApiEndpoint = useMemo(
    () => getGitLabApiEndpoint(),
    [getGitLabApiEndpoint]
  );
  const gitLabAccessToken = useMemo(
    () => getGitLabAccessToken(),
    [getGitLabAccessToken]
  );
  const gitLabProjectPath = useMemo(
    () => getGitLabProjectPath(),
    [getGitLabProjectPath]
  );

  const defaultVariables = useMemo(() => {
    return { fullPath: gitLabProjectPath };
  }, [gitLabProjectPath]);

  const requestHeaders = useMemo(() => {
    return {
      authorization: `Bearer ${gitLabAccessToken}`,
    };
  }, [gitLabAccessToken]);

  const { graphQLApiClient } = useGraphQLApiClient(
    gitLabApiEndpoint ?? "",
    requestHeaders
  );

  const projectLabelQuery: UseQueryResult<GitLab.LabelData> = useQuery({
    ...gitLabLabelsQueries.list(graphQLApiClient, defaultVariables),
    suspense: true,
    enabled: !!gitLabApiEndpoint && !!gitLabProjectPath && !!gitLabAccessToken,
  });

  const groupLabelQuery: UseQueryResult<GitLab.LabelData> = useQuery({
    ...gitLabGroupLabelsQueries.list(graphQLApiClient, defaultVariables),
    suspense: true,
    enabled: !!gitLabApiEndpoint && !!gitLabProjectPath && !!gitLabAccessToken,
  });

  return {
    projectLabels: projectLabelQuery.data,
    groupLabels: groupLabelQuery.data,
  };
};
