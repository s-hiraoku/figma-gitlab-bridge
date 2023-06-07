import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSettings } from "@hooks/useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { parseFigmaId } from "../../utils";
import { Figma } from "@types";

export const useFigJamStickyNotes = (figmaUrl: string) => {
  const [data, setData] = useState<Figma.FileResponse | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const { data: settings } = useSettings();
  const adjustedSettings = settings ?? [];

  const apiKey =
    findValueInSettingsByKey(adjustedSettings, SETTING_KEY.figmaAccessToken) ??
    "";
  const figmaAPIEndpoint = findValueInSettingsByKey(
    adjustedSettings,
    SETTING_KEY.figmaAPIEndpoint
  );

  const figmaId = parseFigmaId(figmaUrl);
  const requestUrl = `${figmaAPIEndpoint}${figmaId}`;

  const fetchStickyNotes = useCallback(async () => {
    setIsValidating(true);
    try {
      const response = await axios.get<Figma.FileResponse>(requestUrl, {
        headers: {
          "X-Figma-Token": apiKey,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        throw err;
      }
      setError(err);
    } finally {
      setIsValidating(false);
    }
  }, [apiKey, requestUrl]);

  return {
    data,
    error,
    isValidating,
    fetchStickyNotes,
  };
};
