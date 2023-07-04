import { Settings } from "@lib/validators";

export type settingKey = figmaSettingKey | gitLabSettingKey;
type figmaSettingKey = "figmaAccessToken" | "figmaAPIEndpoint";
type gitLabSettingKey =
  | "gitLabProjectPath"
  | "gitLabAccessToken"
  | "gitLabAPIEndpoint";

export const SETTING_KEY: Record<settingKey, settingKey> = {
  figmaAccessToken: "figmaAccessToken",
  figmaAPIEndpoint: "figmaAPIEndpoint",
  gitLabProjectPath: "gitLabProjectPath",
  gitLabAccessToken: "gitLabAccessToken",
  gitLabAPIEndpoint: "gitLabAPIEndpoint",
} as const;

export const findValueInSettingsByKey = (array: Settings, key: string) => {
  const obj = array.find((item) => item.key === key);
  return obj ? obj.value : null;
};
