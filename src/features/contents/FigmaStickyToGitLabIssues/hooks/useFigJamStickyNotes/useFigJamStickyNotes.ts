import { useCallback, useEffect, useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import { parseFigmaId } from "../../utils";
import { Figma } from "@types";
import { useFigmaApiClient } from "@hooks/useFigmaApiClient";
import { useFigmaSettings } from "@hooks/useFigmaSettings";

const FIGMA_FILES_PATH = "/files";

export const useFigJamStickyNotes = (figmaUrl: string) => {
  const [data, setData] = useState<Figma.FileResponse | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { figmaApiClient } = useFigmaApiClient();

  useEffect(() => {
    if (figmaUrl) {
      setData(undefined);
      setError(undefined);
    }
  }, [figmaUrl]);

  const { getFigmaAccessToken } = useFigmaSettings();

  const figmaAccessToken = getFigmaAccessToken();

  const figmaId = parseFigmaId(figmaUrl);
  const requestUrl = figmaId
    ? `${FIGMA_FILES_PATH}/${figmaId}`
    : `${FIGMA_FILES_PATH}`;

  const fetchStickyNotes = useCallback(async () => {
    setIsValidating(true);
    setData(undefined);
    try {
      const response = await figmaApiClient.get<Figma.FileResponse>(
        requestUrl,
        {
          headers: {
            "X-Figma-Token": figmaAccessToken,
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
  }, [figmaAccessToken, figmaApiClient, requestUrl]);

  return {
    data,
    error,
    isValidating,
    fetchStickyNotes,
  };
};
