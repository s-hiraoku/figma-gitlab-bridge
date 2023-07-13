import { useEffect, useMemo, useState } from "react";
import { GitLab } from "@types";
import { gitLabLabelsQueries } from "./queries";
import { useGitLabSettings } from "@hooks/useGitLabSettings";
import { useGraphQLApiClient } from "@hooks/useGraphQLApiClient";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useGitLabLabels = () => {
  const { getGitLabAPIEndpoint, getGitLabAccessToken, getGitLabProjectPath } =
    useGitLabSettings();

  const gitLabAPIEndpoint = useMemo(
    () => getGitLabAPIEndpoint(),
    [getGitLabAPIEndpoint]
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
    gitLabAPIEndpoint ?? "https://gitlab.com/api/graphql",
    requestHeaders
  );

  const query: UseQueryResult<GitLab.LabelData> = useQuery({
    ...gitLabLabelsQueries.all(graphQLApiClient, defaultVariables),
    suspense: true,
    enabled: !!gitLabAPIEndpoint && !!gitLabProjectPath && !!gitLabAccessToken,
  });

  return {
    data: query.data,
  };
};
