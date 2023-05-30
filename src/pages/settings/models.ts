import { Settings } from "@lib/validators";

type settingKey = "figmaAccessToken" | "figmaAPIEndpoint";

export const SETTING_KEY: Record<settingKey, settingKey> = {
  figmaAccessToken: "figmaAccessToken",
  figmaAPIEndpoint: "figmaAPIEndpoint",
} as const;

export const findValueInSettingsByKey = (array: Settings, key: string) => {
  const obj = array.find((item) => item.key === key);
  return obj ? obj.value : null;
};
