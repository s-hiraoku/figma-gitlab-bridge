import { Settings } from "@lib/validators";

export type settingKey = figmaSettingKey | gitLabSettingKey;
type figmaSettingKey = "figmaAccessToken" | "figmaApiEndpoint";
type gitLabSettingKey =
  | "gitLabProjectPath"
  | "gitLabAccessToken"
  | "gitLabApiEndpoint";

export const SETTING_KEY: Record<settingKey, settingKey> = {
  figmaAccessToken: "figmaAccessToken",
  figmaApiEndpoint: "figmaApiEndpoint",
  gitLabProjectPath: "gitLabProjectPath",
  gitLabAccessToken: "gitLabAccessToken",
  gitLabApiEndpoint: "gitLabApiEndpoint",
} as const;

export const findValueInSettingsByKey = (array: Settings, key: string) => {
  const obj = array.find((item) => item.key === key);
  return obj ? obj.value : null;
};
