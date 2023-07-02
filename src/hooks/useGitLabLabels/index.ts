import { useMemo } from "react";
import { useGraphQLClient } from "../useGraphQLClient";
import { useSettings } from "../useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { GitLab } from "@types";
import { GET_LABELS_QUERY } from "./queries";

export const useGitLabLabels = () => {
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
