import { useEffect, useMemo, useState } from "react";
import { GitLab } from "@types";
import { gitLabLabelsQueries } from "./queries";
import { useGitLabSettings } from "@hooks/useGitLabSettings";
import { useGraphQLApiClient } from "@hooks/useGraphQLApiClient";
import {
  UseSuspenseQueryResultOnSuccess,
  useSuspenseQuery,
} from "@suspensive/react-query";

export const useGitLabLabels = () => {
  const { getGitLabAPIEndpoint, getGitLabAccessToken, getGitLabProjectPath } =
    useGitLabSettings();

  const [gitLabAPIEndpoint, setGitLabAPIEndpoint] = useState<string>("");
  const [gitLabAccessToken, setGitLabAccessToken] = useState<string>("");
  const [gitLabProjectPath, setGitLabProjectPath] = useState<string>("");

  useEffect(() => {
    setGitLabAPIEndpoint(getGitLabAPIEndpoint() ?? "");
    setGitLabAccessToken(getGitLabAccessToken() ?? "");
    setGitLabProjectPath(getGitLabProjectPath() ?? "");
  }, [getGitLabAPIEndpoint, getGitLabAccessToken, getGitLabProjectPath]);

  const defaultVariables = useMemo(() => {
    return { fullPath: gitLabProjectPath };
  }, [gitLabProjectPath]);

  const requestHeaders = useMemo(() => {
    return {
      authorization: `Bearer ${gitLabAccessToken}`,
    };
  }, [gitLabAccessToken]);

  const { graphQLApiClient } = useGraphQLApiClient(
    gitLabAPIEndpoint ?? "",
    requestHeaders
  );

  const query: UseSuspenseQueryResultOnSuccess<GitLab.LabelData> =
    useSuspenseQuery(
      gitLabLabelsQueries.all(graphQLApiClient, defaultVariables)
    );

  return {
    data: query.data,
  };
};
