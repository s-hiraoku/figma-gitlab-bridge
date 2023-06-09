import { useCallback, useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import { useSettings } from "@hooks/useSettings";
import { SETTING_KEY, findValueInSettingsByKey } from "@features/settings";
import { parseFigmaId } from "../../utils";
import { Figma } from "@types";
import { useFigmaApiClient } from "@services/useFigmaApiClient";

export const useFigJamStickyNotes = (figmaUrl: string) => {
  const [data, setData] = useState<Figma.FileResponse | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { figmaApiClient } = useFigmaApiClient();

  const { data: settings } = useSettings();
  const adjustedSettings = settings ?? [];

  const apiKey =
    findValueInSettingsByKey(adjustedSettings, SETTING_KEY.figmaAccessToken) ??
    "";

  const figmaId = parseFigmaId(figmaUrl);
  const requestUrl = figmaId ?? "";

  const fetchStickyNotes = useCallback(async () => {
    setIsValidating(true);
    try {
      const response = await figmaApiClient.get<Figma.FileResponse>(
        requestUrl,
        {
          headers: {
            "X-Figma-Token": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      setData(response.data);
    } catch (err) {
      if (!isAxiosError(err)) {
        throw err;
      }
      setError(err);
    } finally {
      setIsValidating(false);
    }
  }, [apiKey, figmaApiClient, requestUrl]);

  return {
    data,
    error,
    isValidating,
    fetchStickyNotes,
  };
};
