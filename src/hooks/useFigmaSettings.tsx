import { useCallback, useMemo } from "react";
import { useSettings } from "./useSettings";
import {
  SETTING_KEY,
  findValueInSettingsByKey,
  settingKey,
} from "@features/settings";

export const useFigmaSettings = () => {
  const { data: settings } = useSettings();

  const getSetting = useMemo(() => {
    const adjustedSettings = settings ?? [];
    return (key: settingKey) => findValueInSettingsByKey(adjustedSettings, key);
  }, [settings]);

  return {
    getFigmaAccessToken: useCallback(
      () => getSetting(SETTING_KEY.figmaAccessToken),
      [getSetting]
    ),
    getFigmaAPIEndpoint: useCallback(
      () => getSetting(SETTING_KEY.figmaAPIEndpoint),
      [getSetting]
    ),
  };
};
