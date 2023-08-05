import { useCallback } from "react";
import { useSettings } from "./useSettings";
import {
  SETTING_KEY,
  findValueInSettingsByKey,
  settingKey,
} from "@features/settings";

export const useGitLabSettings = () => {
  const { data: settings } = useSettings();

  const getSetting = useCallback(
    (key: settingKey) => {
      const adjustedSettings = settings ?? [];
      return findValueInSettingsByKey(adjustedSettings, key);
    },
    [settings]
  );

  return {
    getGitLabApiEndpoint: useCallback(
      () => getSetting(SETTING_KEY.gitLabApiEndpoint),
      [getSetting]
    ),
    getGitLabAccessToken: useCallback(
      () => getSetting(SETTING_KEY.gitLabAccessToken),
      [getSetting]
    ),
    getGitLabProjectPath: useCallback(
      () => getSetting(SETTING_KEY.gitLabProjectPath),
      [getSetting]
    ),
  };
};
