import { findValueInSettingsByKey, SETTING_KEY } from "./index";
import { Settings } from "@lib/validators";

const settings: Settings = [
  { id: 0, key: "figmaAccessToken", value: "1234567890abcdef" },
  { id: 1, key: "figmaApiEndpoint", value: "https://api.figma.com/v1/" },
];

describe("findValueInSettingsByKey", () => {
  it("should return the correct value based on the input key", () => {
    expect(
      findValueInSettingsByKey(settings, SETTING_KEY.figmaAccessToken)
    ).toBe("1234567890abcdef");
    expect(
      findValueInSettingsByKey(settings, SETTING_KEY.figmaApiEndpoint)
    ).toBe("https://api.figma.com/v1/");
  });

  it("should return null when the key is not found", () => {
    expect(findValueInSettingsByKey(settings, "nonExistentKey")).toBeNull();
  });
});
