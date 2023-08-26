import { useCallback } from "react";
import { useSettings } from "./useSettings";
import {
  SETTING_KEY,
  findValueInSettingsByKey,
  settingKey,
} from "@features/settings";

export const useFigmaSettings = () => {
  const { data: settings } = useSettings();

  const getSetting = useCallback(
    (key: settingKey) => {
      const adjustedSettings = settings ?? [];
      return findValueInSettingsByKey(adjustedSettings, key);
    },
    [settings]
  );

  return {
    getFigmaAccessToken: useCallback(
      () => getSetting(SETTING_KEY.figmaAccessToken),
      [getSetting]
    ),
    getFigmaApiEndpoint: useCallback(
      () => getSetting(SETTING_KEY.figmaApiEndpoint),
      [getSetting]
    ),
    getFigmaUrl: useCallback(
      () => getSetting(SETTING_KEY.figmaUrl),
      [getSetting]
    ),
  };
};
