import { useCallback, useState } from "react";
import { AxiosError, isAxiosError } from "axios";
import { parseFigmaId } from "../../utils";
import { Figma } from "@types";
import { useFigmaApiClient } from "@hooks/useFigmaApiClient";
import { useFigmaSettings } from "@hooks/useFigmaSettings";

const FIGMA_FILES_PATH = "/files";

// Todo: Change to request with Suspense
export const useFigJamStickyNotes = () => {
  const [data, setData] = useState<Figma.FileResponse | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { figmaApiClient } = useFigmaApiClient();

  const { getFigmaAccessToken } = useFigmaSettings();

  const fetchStickyNotes = useCallback(
    async (figmaUrl: string) => {
      setIsValidating(true);
      setData(undefined);
      const figmaAccessToken = getFigmaAccessToken();

      const figmaId = parseFigmaId(figmaUrl);
      const requestUrl = figmaId ? `${FIGMA_FILES_PATH}/${figmaId}` : ``;
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
    },
    [figmaApiClient, getFigmaAccessToken]
  );

  return {
    data,
    error,
    isValidating,
    fetchStickyNotes,
  };
};
