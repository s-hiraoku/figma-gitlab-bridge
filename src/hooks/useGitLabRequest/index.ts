import { useMemo } from "react";
import { useGraphQLClient } from "../useGraphQLClient";
import { useSettings } from "../useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { Data } from "./models";
import { GET_ISSUES_QUERY, CREATE_ISSUE_MUTATION } from "./graphqlQueries";

export const useGitLabRequest = () => {
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

  const defaultVariables = useMemo(() => {
    return { fullPath: gitLabProjectPath };
  }, [gitLabProjectPath]);

  const requestHeaders = useMemo(() => {
    return {
      authorization: `Bearer ${gitLabAccessToken}`,
    };
  }, [gitLabAccessToken]);

  const { data, error, isLoading, fetch, mutate } = useGraphQLClient<Data>(
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
